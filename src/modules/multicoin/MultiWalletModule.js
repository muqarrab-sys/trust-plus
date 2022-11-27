import BitcoinWalletModule from "@modules/bitcoin/BitcoinWalletModule";
import EtherWalletModule from "@modules/etherjs/EtherWalletModule";
import uuid from 'react-native-uuid';
import BscEtherWalletModule from "@modules/bscetherjs/BscEtherWalletModule";
import BitcoinModuleService from "@modules/bitcoin/BitcoinModuleService";
import moment from 'moment';
import _ from 'lodash';
import BitcoinUtil from "@modules/bitcoin/BitcoinUtil";
import {EthereumService} from "@persistence/ethereum/EthereumService";
import UniswapModule from "@modules/uniswap/UniswapModule";
import {CurrencyUtil} from "@components/utils/CurrencyUtil";
import {applicationProperties} from "@src/application.properties";
import PancakeswapModule from "@modules/pancakeswap/PancakeswapModule";
import {SmartChainService} from "@persistence/smartchain/SmartChainService";

const formatWalletAddress = (address) => {
    const prefix = address.substring(0, 6);
    const suffix = address.substring(address.length - 4, address.length);
    return prefix + "..." + suffix;
}

async function fromMnemonic(params) {
    try {
        const {mnemonics} = params;
        const eWallet = await EtherWalletModule.fromMnemonic(mnemonics);
        let total = 0.0;
        const ethWallet = {
            id: uuid.v4(),
            name: 'Ethereum',
            symbol: 'ETH',
            chainId: applicationProperties.ethNetwork.chainId,
            address: eWallet.address,
            formattedAddress: formatWalletAddress(eWallet.address),
            logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013',
            balance: {
                val: 0.0,
                fiat: 0.0,
            },
            privateKey: eWallet.privateKey,
            wallet: eWallet
        };

        total += ethWallet.balance.fiat;
        const bWallet = await BscEtherWalletModule.fromPrivateKey(ethWallet.privateKey);
        const bscWallet = {
            id: uuid.v4(),
            name: 'Binance Smart Coin',
            symbol: 'BNB',
            chainId: applicationProperties.bscNetwork.chainId,
            address: bWallet.address,
            formattedAddress: formatWalletAddress(bWallet.address),
            balance: {
                val: 0.0,
                fiat: 0.0,
            },
            logoURI: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=014',
            privateKey: bWallet.privateKey,
            wallet: bWallet
        };
        total += bscWallet.balance.fiat;
        const btc = BitcoinWalletModule.payToWitnessPublicKeyHashMnemonic(params);
        const btcWallet = {
            id: uuid.v4(),
            name: 'Bitcoin',
            symbol: 'BTC',
            address: btc.address,
            chainId: applicationProperties.btcNetwork.chainId,
            formattedAddress: formatWalletAddress(btc.address),
            balance: {
                val: 0.0,
                fiat: 0.0,
            },
            logoURI: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=014',
            privateKey: btc.wif,
            wallet: btc
        }
        total += btcWallet.balance.fiat;
        const multiCoinWallet = {
            ...params,
            balance: total,
            wallets: [btcWallet, ethWallet, bscWallet]
        }
        return multiCoinWallet;
    } catch (e) {
        console.log("MultiWalletModule-fromMnemonic()" + e);
        return undefined;
    }
}

async function fromPrivateKey(multiCoinWallet) {
    try {
        const {wallets} = multiCoinWallet;
        let total = 0.0;
        for (var i = 0; i < wallets.length; i++) {
            if (wallets[i].chainId == applicationProperties.btcNetwork.chainId) {
                wallets[i].wallet = await BitcoinWalletModule.payToWitnessPublicKeyHash({wif: wallets[i].privateKey});
                wallets[i].balance = await BitcoinModuleService.getBalance(wallets[i].address);
                //const {transactions} = await getBitcoinTransactions(wallets[i].address);
                wallets[i].transactions = [];
                total += wallets[i].balance.fiat;
            } else if (wallets[i].chainId == applicationProperties.ethNetwork.chainId) {
                wallets[i].wallet = await EtherWalletModule.fromPrivateKey(wallets[i].privateKey);
                //wallets[i].balance =   wallets[i].symbol == 'ETH' ? await EtherWalletModule.getBalance(wallets[i].wallet) : await UniswapModule.getTokenBalance(wallets[i].wallet, {symbol:wallets[i].symbol, address : wallets[i].contractAddress});
                //const transactions = await EthereumService.getTransactions(wallets[i].address);
                wallets[i].transactions = [];
                total += wallets[i].balance.fiat;
            } else if (wallets[i].chainId == applicationProperties.bscNetwork.chainId) {
                wallets[i].wallet = await BscEtherWalletModule.fromPrivateKey(wallets[i].privateKey);
                //wallets[i].balance =   wallets[i].symbol == 'BNB' ? await BscEtherWalletModule.getBalance(wallets[i].wallet) : await PancakeswapModule.getTokenBalance(wallets[i].wallet, {symbol:wallets[i].symbol,address : wallets[i].contractAddress});
                //const transactions = await SmartChainService.getTransactions(wallets[i].address);
                wallets[i].transactions = [];
                total += wallets[i].balance.fiat;
            }
        }
        multiCoinWallet.balance = total;
        return multiCoinWallet;
    } catch (e) {
        console.log(e.message)
        return null;
    }
}

function getWalletBySymbol(multiCoinWallet, symbol) {
    const {wallets} = multiCoinWallet;
    for (let i = 0; i < wallets.length; i++) {
        if (wallets[i].symbol == symbol) {
            return wallets[i];
        }
    }
    return undefined;
}

async function addWalletFromPrivateKey(multiCoinWallet, token) {
    try {
        const wallets = [...multiCoinWallet.wallets];
        const chainId = token.chainId;
        let total = multiCoinWallet.balance;
        //ETH
        if (chainId == 4) {
            const wallet = getWalletBySymbol(multiCoinWallet, 'ETH');
            const balance = await UniswapModule.tokenBalance(wallet.wallet, token);
            const fiatBalance = await CurrencyUtil.convert(balance.val, token.symbol, 'USD');
            total += fiatBalance;
            wallets.push({
                ...wallet, ...token, ...{
                    contractAddress: token.address, id: uuid.v4(), balance: {
                        val: balance.val,
                        fiat: fiatBalance
                    }
                }
            });
        } else if (chainId == 56) {
            const wallet = getWalletBySymbol(multiCoinWallet, 'BNB');
            const balance = await UniswapModule.tokenBalance(wallet.wallet, token);
            const fiatBalance = await CurrencyUtil.convert(balance.val, token.symbol, 'USD');
            wallets.push({
                ...wallet, ...token, ...{
                    contractAddress: token.address, id: uuid.v4(), balance: {
                        val: balance.val,
                        fiat: fiatBalance
                    }
                }
            });
            total += fiatBalance;
        }
        multiCoinWallet.balance = total;
        multiCoinWallet.wallets = wallets;
        return multiCoinWallet;
    } catch (e) {
        console.log(e.message)
        return null;
    }
}

async function removeWallet(multiCoinWallet, token) {
    try {
        const wallets = [...multiCoinWallet.wallets];
        let total = multiCoinWallet.balance;
        const removeWallets = _.remove(wallets, function (wallet) {
            return wallet.symbol == token.symbol;
        });
        total -= removeWallets[0].balance.val;
        multiCoinWallet.balance = total;
        multiCoinWallet.wallets = wallets;
        return multiCoinWallet;
    } catch (e) {
        console.log(e.message)
        return null;
    }
}

async function reloadWallet(wallet, walletId) {
    try {
        const multiCoinWallet = {...wallet};
        let total = multiCoinWallet.balance;
        const wallets = [...multiCoinWallet.wallets];
        const index = _.findIndex(wallets, function (mul) {
            return mul.id === walletId;
        });
        const updatedWallet = {...wallets[index]};
        const currentBalance = updatedWallet.balance.fiat;
        total -= updatedWallet.balance.fiat;
        const ethWallet =  getWalletBySymbol(multiCoinWallet, 'ETH');
        const bnbWallet =  getWalletBySymbol(multiCoinWallet, 'BNB');
        if (_.isNil(updatedWallet.chainId)) {
            updatedWallet.balance = await BitcoinModuleService.getBalance(updatedWallet.address);
            const {fetch, transactions} = await getBitcoinTransactions(updatedWallet.address);
            multiCoinWallet.fetch = fetch;
            updatedWallet.transactions = transactions;
        } else if (updatedWallet.chainId == applicationProperties.ethNetwork.chainId) {
            if (updatedWallet.symbol == 'ETH') {
                updatedWallet.balance = await EtherWalletModule.getBalance(updatedWallet.wallet);
                const transactions = await EthereumService.getTransactions(updatedWallet.address);
                updatedWallet.transactions = transactions;
            } else {
                updatedWallet.balance = await UniswapModule.getTokenBalance(updatedWallet.wallet, updatedWallet);
                const transactions = await EthereumService.getTokenTransactions(ethWallet.address,updatedWallet);
                updatedWallet.transactions = transactions;
            }
            multiCoinWallet.fetch = currentBalance > updatedWallet.balance.fiat;

        } else if (updatedWallet.chainId == applicationProperties.bscNetwork.chainId) {
            if (updatedWallet.symbol == 'BNB') {
                updatedWallet.balance = await BscEtherWalletModule.getBalance(updatedWallet.wallet);
                const transactions = await SmartChainService.getTransactions(updatedWallet.address);
                updatedWallet.transactions = transactions;
            } else {
                updatedWallet.balance = await PancakeswapModule.getTokenBalance(updatedWallet.wallet, updatedWallet);
                const transactions = await SmartChainService.getTokenTransactions(bnbWallet.address, updatedWallet);
                updatedWallet.transactions = transactions;
            }
            multiCoinWallet.fetch = currentBalance > updatedWallet.balance.fiat;
        }
        wallets.splice(index, 1, updatedWallet);
        total += updatedWallet.balance.fiat;
        multiCoinWallet.balance = total;
        multiCoinWallet.wallets = wallets;
        return multiCoinWallet;
    } catch (e) {
        console.log(e.message)
        return null;
    }
}

async function reloadBalance(params) {
    try {
        const multiCoinWallet = {...params};
        let total = 0.0;
        const {wallets} = multiCoinWallet;
        const tempWallets = [];
        const ethWallet =  getWalletBySymbol(multiCoinWallet, 'ETH');
        console.log("ETH"+ethWallet.address);
        const bnbWallet =  getWalletBySymbol(multiCoinWallet, 'BNB');
        console.log("BNB"+bnbWallet.address);
        for (let i = 0; i < wallets.length; i++) {
            const newWallet = {...wallets[i]};
            if (wallets[i].symbol == 'BTC') {
                newWallet.balance = await BitcoinModuleService.getBalance(wallets[i].address);
                const {fetch, transactions} = await getBitcoinTransactions(wallets[i].address);
                multiCoinWallet.fetch = fetch;
                newWallet.transactions = transactions;
            } else if (wallets[i].chainId == applicationProperties.ethNetwork.chainId) {
                if (wallets[i].symbol == 'ETH') {
                    newWallet.balance = await EtherWalletModule.getBalance(wallets[i].wallet);
                    const transactions = await EthereumService.getTransactions(wallets[i].address);
                    newWallet.transactions = transactions;
                } else {
                    newWallet.balance = await UniswapModule.getTokenBalance(wallets[i].wallet, wallets[i]);
                    const transactions = await EthereumService.getTokenTransactions(ethWallet.address,wallets[i]);
                    newWallet.transactions = transactions;
                }
            } else if (wallets[i].chainId == applicationProperties.bscNetwork.chainId) {
                if (wallets[i].symbol == 'BNB') {
                    newWallet.balance = await BscEtherWalletModule.getBalance(wallets[i].wallet);
                    const transactions = await SmartChainService.getTransactions(wallets[i].address);
                    newWallet.transactions = transactions;
                } else {
                    newWallet.balance = await PancakeswapModule.getTokenBalance(wallets[i].wallet, wallets[i]);
                    const transactions = await SmartChainService.getTokenTransactions(bnbWallet.address,wallets[i]);
                    newWallet.transactions = transactions;
                }

            }
            tempWallets.push(newWallet);
            total += newWallet.balance.fiat;
        }
        multiCoinWallet.balance = total;
        multiCoinWallet.wallets = tempWallets;
        return multiCoinWallet;
    } catch (e) {
        console.log("multiCoinWallet")
        console.log(e.message)
        return null;
    }
}

async function getBitcoinTransactions(address) {
    const {fetch, transactions} = await BitcoinModuleService.getTransactions(address);
    for (let i = 0; i < transactions.length; i++) {
        const vin = transactions[i].vin;
        const isSender = _.findIndex(vin, function (input) {
            return input.prevout.scriptpubkey_address == address;
        }) == -1 ? false : true;
        transactions[i].sender = isSender;
        transactions[i].from = address;
        const vout = transactions[i].vout;
        let sum = 0;
        _.forEach(vout, function (out) {
            if (isSender) {
                sum += out.scriptpubkey_address != address ? out.value : 0;
            } else {
                sum += out.scriptpubkey_address == address ? out.value : 0;
            }
        });
        transactions[i].to = vout[0].scriptpubkey_address;
        transactions[i].value = BitcoinUtil.toBTC(sum);
        transactions[i].time = moment(transactions[i].status?.block_time, 'X').fromNow();
    }
    return {fetch, transactions};
}

const MultiWalletModule = {
    fromMnemonic,
    fromPrivateKey,
    reloadWallet,
    addWalletFromPrivateKey,
    removeWallet,
    reloadBalance
}
export default MultiWalletModule;

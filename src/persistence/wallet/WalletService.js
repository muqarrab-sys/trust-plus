import React from 'react';
import {StorageUtil} from '@components/utils/StorageUtil';
import BitcoinWalletModule from '@modules/bitcoin/BitcoinWalletModule';
import {EthereumService} from '@persistence/ethereum/EthereumService';
import EtherWalletModule from '@modules/etherjs/EtherWalletModule';
import {hexZeroPad} from 'ethers/lib/utils';
import {utils} from 'ethers';
import {EtherProviderModule} from '@modules/etherjs/EtherProviderModule';
import _ from 'lodash'
import BscEtherWalletModule from '@modules/bscetherjs/BscEtherWalletModule';
import {SmartChainService} from '@persistence/smartchain/SmartChainService';
export const WalletService = {
    setActiveWallet,
    addBtcWallet,
    addEthWallet,
    addBnbWallet,
    getActiveWallet,
    getTransactions,
    getWallets,
    getTokenTransactions,
    getSubscribeWallets
};

async function addBtcWallet(wallet) {
    const {success, wif, ...rest} = BitcoinWalletModule.payToWitnessPublicKeyHashMnemonic(wallet);
    const btcWallet = {
        ...wallet,
        ...rest,
        privateKey: wif,
        wallet: {...rest},
    };
    const id = 'Wallets';
    const wallets = await StorageUtil.getItem(id) || [];
    await StorageUtil.setItem(id, [btcWallet, ...wallets]);
    return {success, btcWallet};
}
async function addEthWallet(wallet) {
    const {mnemonics} = wallet;
    const eWallet = await EtherWalletModule.fromMnemonic(mnemonics);
    const ethWallet = {
        ...wallet,
        address: eWallet.address,
        privateKey: eWallet.privateKey,
    };
    const id = 'Wallets';
    const wallets = await StorageUtil.getItem(id) || [];
    await StorageUtil.setItem(id, [ethWallet, ...wallets]);
    ethWallet.wallet= eWallet;
    return {success: true, ethWallet};
}
async function addBnbWallet(wallet) {
    const {mnemonics} = wallet;
    const bWallet = await BscEtherWalletModule.fromMnemonic(mnemonics);
    const bscWallet = {
        ...wallet,
        address: bWallet.address,
        privateKey: bWallet.privateKey,
        wallet: bWallet,
    };
    const id = 'Wallets';
    const wallets = await StorageUtil.getItem(id) || [];
    await StorageUtil.setItem(id, [bscWallet, ...wallets]);
    return {success: true, bscWallet};
}
async function setActiveWallet(params) {
    const id = 'Active-Wallet';
    await StorageUtil.setItem(id, params);
    return params;
}
async function getActiveWallet() {
    const id = 'Active-Wallet';
    return await StorageUtil.getItem(id);
}
async function getTransactions(wallet) {
    const symbol = wallet.network.symbol;
    if(symbol === 'BTC'){
        const trans = await BitcoinWalletModule.getTransactions(wallet);
        return trans;
    }else if(symbol === 'ETH'){
        const trans = await EthereumService.getTransactions(wallet.address);
        return trans;
    }else if(symbol === 'BNB'){
        const trans = await SmartChainService.getTransactions(wallet.address);
        return trans;
    }
}
async function getTokenTransactions(wallet,token) {
    const symbol = wallet.network.symbol;
    if(symbol === 'BTC'){
        return [];
    }else if(symbol === 'ETH'){
        const trans = await EthereumService.getTokenTransactions(wallet.address,token.address);
        return trans;
    }else if(symbol === 'BNB'){
        const trans = await SmartChainService.getTokenTransactions(wallet.address,token.address);
        return trans;
    }

}
async function getWallets() {
    const id = 'Wallets';
    const wallets = await StorageUtil.getItem(id) || [];
    return wallets;
}
async function getSubscribeWallets() {
    const id = 'Wallets';
    const wallets = await StorageUtil.getItem(id) || [];
    const addresses = [];
    for(let i = 0 ; i < wallets.length; i++){
        if(wallets[i].network.symbol != 'BTC' && !_.isNil(wallets[i].address)){
            addresses.push(hexZeroPad(wallets[i].address, 32));
        }
    }
    const topicSets = [
        utils.id("Transfer(address,address,uint256)"),
        null,
        addresses
    ]
    const provider = await EtherProviderModule.getProvider();
    provider.on(topicSets, (log, event) => {
        // Emitted any token is sent TO either address
        console.log("log"+ JSON.stringify(log));
        console.log("event"+ JSON.stringify(event));

    })

    return wallets;
}

import {WalletService} from '@persistence/wallet/WalletService';
import BitcoinWalletModule from '@modules/bitcoin/BitcoinWalletModule';
import _ from 'lodash';
import bitcoin from 'bitcoin-units';
import moment from 'moment';
import {
  addWalletSuccess,
  getTokenTransactionsSuccess,
  getTransactionsSuccess,
  getWalletsSuccess,
  setActiveWalletSuccess,
} from '@persistence/wallet/WalletReducer';
import EtherWalletModule from '@modules/etherjs/EtherWalletModule';
import BscEtherWalletModule from '@modules/bscetherjs/BscEtherWalletModule';

export const WalletAction = {
  addBtcWallet,
  addEthWallet,
  addBnbWallet,
  setActiveWallet,
  getActiveWallet,
  getTransactions,
  getWallets,
  getTokenTransactions,
};

function addBtcWallet(wallet) {
  return async dispatch => {
    const {success, btcWallet} = await WalletService.addBtcWallet(wallet);
    if (success) {
      dispatch(addWalletSuccess(btcWallet));
    }
    return {success, btcWallet};
  };
}
function addEthWallet(wallet) {
  return async dispatch => {
    const {success, ethWallet} = await WalletService.addEthWallet(wallet);
    if (success) {
      dispatch(addWalletSuccess(ethWallet));
    }
    return {success, ethWallet};
  };
}
function addBnbWallet(wallet) {
  return async dispatch => {
    const {success, bscWallet} = await WalletService.addBnbWallet(wallet);
    if (success) {
      dispatch(addWalletSuccess(bscWallet));
    }
    return {success, bscWallet};
  };
}
function setActiveWallet(wallet) {
  return async dispatch => {
    if (wallet.network.symbol === 'BTC') {
      const balance = wallet.balance ?? (await BitcoinWalletModule.getBalance(wallet.address));
      const btcWallet = wallet.wallet ?? (await BitcoinWalletModule.payToWitnessPublicKeyHashMnemonic(wallet));
      const newWallet = {...wallet, balance, wallet: btcWallet};
      await WalletService.setActiveWallet(newWallet);
      dispatch(setActiveWalletSuccess(newWallet));
    } else if (wallet.network.symbol === 'ETH') {
      const balance = wallet.balance ?? (await EtherWalletModule.getBalance(wallet.address));
      const ethWallet = wallet.wallet ?? (await EtherWalletModule.fromPrivateKey(wallet.privateKey));
      const newWallet = {...wallet, balance, wallet: ethWallet};
      dispatch(setActiveWalletSuccess(newWallet));
      newWallet.wallet = null;
      await WalletService.setActiveWallet(newWallet);
    } else if (wallet.network.symbol === 'BNB') {
      const balance = wallet.balance ?? (await BscEtherWalletModule.getBalance(wallet.address));
      const bnbWallet = wallet.wallet ?? (await BscEtherWalletModule.fromPrivateKey(wallet.privateKey));
      const newWallet = {...wallet, balance, wallet: bnbWallet};
      await WalletService.setActiveWallet(newWallet);
      dispatch(setActiveWalletSuccess(newWallet));
    }
  };
}
function getActiveWallet() {
  return async dispatch => {
    const wallet = await WalletService.getActiveWallet();
    if (wallet.network.symbol === 'BTC') {
      wallet.wallet = await BitcoinWalletModule.payToWitnessPublicKeyHashMnemonic(wallet);
      wallet.balance = await BitcoinWalletModule.getBalance(wallet.address);
    } else if (wallet.network.symbol === 'ETH') {
      wallet.wallet = await EtherWalletModule.fromPrivateKey(wallet.privateKey);
      wallet.balance = await EtherWalletModule.getBalance(wallet.address);
    } else if (wallet.network.symbol === 'BNB') {
      wallet.wallet = await BscEtherWalletModule.fromPrivateKey(wallet.privateKey);
      wallet.balance = await BscEtherWalletModule.getBalance(wallet.address);
    }
    dispatch(setActiveWalletSuccess(wallet));
  };
}
function getTransactions(wallet) {
  return async dispatch => {
    const symbol = wallet.network.symbol;
    const {address} = wallet;
    const transactions = await WalletService.getTransactions(wallet);
    if (symbol === 'BTC') {
      for (let i = 0; i < transactions.length; i++) {
        const vin = transactions[i].vin;
        const isSender =
          _.findIndex(vin, function (input) {
            return input.prevout.scriptpubkey_address === address;
          }) !== -1;
        transactions[i].sender = isSender;
        transactions[i].from = address;
        const vout = transactions[i].vout;
        let sum = 0;
        _.forEach(vout, function (out) {
          if (isSender) {
            sum += out.scriptpubkey_address !== address ? out.value : 0;
          } else {
            sum += out.scriptpubkey_address === address ? out.value : 0;
          }
        });
        transactions[i].to = vout[0].scriptpubkey_address;
        transactions[i].value = bitcoin(sum, 'satoshi').to('BTC').format();
        transactions[i].date = moment(transactions[i].status?.block_time, 'X').format('MMMM Do YYYY, h:mm:ss a');
      }
      dispatch(getTransactionsSuccess(transactions));
    } else if (symbol === 'ETH') {
      dispatch(getTransactionsSuccess(transactions));
    }
  };
}
function getTokenTransactions(wallet, token) {
  return async dispatch => {
    const transactions = await WalletService.getTokenTransactions(wallet, token);
    dispatch(getTokenTransactionsSuccess(transactions));
  };
}
function getWallets() {
  return async dispatch => {
    const wallets = await WalletService.getWallets();
    dispatch(getWalletsSuccess(wallets));
  };
}

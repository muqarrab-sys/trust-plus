import React from 'react';
import {StorageUtil} from '@components/utils/StorageUtil';
import MultiWalletModule from '@modules/multicoin/MultiWalletModule';
import _ from 'lodash';

export const MulticoinService = {
  add,
  list,
  setActiveMultiCoinWallet,
  getActiveMultiCoinWallet,
  reloadActiveMultiCoinWallet,
  reloadBalanceActiveMultiCoinWallet,
  addWallet,
  removeWallet,
};

async function add(params) {
  try {
    const id = 'Multi-Coin-Wallets';
    const wallet = await MultiWalletModule.fromMnemonic(params);
    const wallets = (await StorageUtil.getItem(id)) || [];
    wallets.push(wallet);
    await StorageUtil.setItem(id, wallets);
    return {
      multiCoinWallets: wallets,
      activeMulticoinWallet: wallet,
    };
  } catch (error) {
    console.error('Error adding multi coin wallet', error);
    return null;
  }
}
async function addWallet(multicoinWallet, token) {
  const activeMultiCoinWallet = await MultiWalletModule.addWalletFromPrivateKey(multicoinWallet, token);
  await setActiveMultiCoinWallet(activeMultiCoinWallet);
  const id = 'Multi-Coin-Wallets';
  const multiCoinWallets = await StorageUtil.getItem(id);
  const index = _.findIndex(multiCoinWallets, function (mul) {
    if (!_.isNil(mul)) {
      return mul.id === multicoinWallet.id;
    }
  });
  multiCoinWallets.splice(index, 1, activeMultiCoinWallet);
  await StorageUtil.setItem(id, multiCoinWallets);
  return {
    multiCoinWallets: multiCoinWallets,
    activeMulticoinWallet: activeMultiCoinWallet,
  };
}
async function removeWallet(multicoinWallet, token) {
  const activeMultiCoinWallet = await MultiWalletModule.removeWallet(multicoinWallet, token);
  await setActiveMultiCoinWallet(activeMultiCoinWallet);
  const id = 'Multi-Coin-Wallets';
  const multiCoinWallets = await StorageUtil.getItem(id);
  const index = _.findIndex(multiCoinWallets, function (mul) {
    if (!_.isNil(mul)) {
      return mul.id === multicoinWallet.id;
    }
  });

  multiCoinWallets.splice(index, 1, activeMultiCoinWallet);
  await StorageUtil.setItem(id, multiCoinWallets);
  return {
    multiCoinWallets: multiCoinWallets,
    activeMulticoinWallet: activeMultiCoinWallet,
  };
}
async function list(params) {
  const id = 'Multi-Coin-Wallets';
  return (await StorageUtil.getItem(id)) || [];
}

async function setActiveMultiCoinWallet(params) {
  const id = 'Active-Multi-Coin-Wallet';
  await StorageUtil.setItem(id, params);
  return params;
}

async function getActiveMultiCoinWallet(params) {
  const id = 'Active-Multi-Coin-Wallet';
  return await StorageUtil.getItem(id);
}
async function reloadActiveMultiCoinWallet(multicoinWallet, walletId) {
  const activeWallet = await MultiWalletModule.reloadWallet(multicoinWallet, walletId);
  const id = 'Active-Multi-Coin-Wallet';
  await StorageUtil.setItem(id, activeWallet);
  return activeWallet;
}
async function reloadBalanceActiveMultiCoinWallet(multicoinWallet) {
  const activeWallet = await MultiWalletModule.reloadBalance(multicoinWallet);
  const id = 'Active-Multi-Coin-Wallet';
  await StorageUtil.setItem(id, activeWallet);
  return activeWallet;
}

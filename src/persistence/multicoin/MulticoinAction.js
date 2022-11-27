import {MulticoinService} from "@persistence/multicoin/MulticoinService";
import {
    addSuccess,
    getActiveMulticoinWalletSuccess,
    listSuccess,
    setActiveMulticoinWalletSuccess
} from "@persistence/multicoin/MulticoinReducer";
import MultiWalletModule from "@modules/multicoin/MultiWalletModule";
import _ from 'lodash';

export const MulticoinAction = {
    list,
    add,
    setActiveMulticoinWallet,
    getActiveMulticoinWallet,
    reloadActiveMulticoinWallet,
    addWallet,
    removeWallet,
    reloadBalance
};

function add(params) {
    return async dispatch => {
        const {
            multiCoinWallets,
            activeMulticoinWallet
        } = await MulticoinService.add(params);
        dispatch(addSuccess(activeMulticoinWallet));
        dispatch(listSuccess(multiCoinWallets));
        return {
            success: true,
            data: activeMulticoinWallet
        }
    };
}

function addWallet(multicoinWallet, token) {
    return async dispatch => {
        const {
            multiCoinWallets,
            activeMulticoinWallet
        } = await MulticoinService.addWallet(multicoinWallet, token);
        dispatch(listSuccess(multiCoinWallets));
        dispatch(setActiveMulticoinWalletSuccess(activeMulticoinWallet));
        return {
            success: true,
            data: activeMulticoinWallet
        }
    };
}

function removeWallet(multicoinWallet, token) {
    return async dispatch => {
        const {
            multiCoinWallets,
            activeMulticoinWallet
        } = await MulticoinService.removeWallet(multicoinWallet, token);
        dispatch(listSuccess(multiCoinWallets));
        dispatch(setActiveMulticoinWalletSuccess(activeMulticoinWallet));
        return {
            success: true,
            data: activeMulticoinWallet
        }
    };
}

function list(params) {
    return async dispatch => {
        dispatch(listSuccess(await MulticoinService.list(params)));
    };
}

function setActiveMulticoinWallet(params) {
    return async dispatch => {
        const multiCoinWallet = await MulticoinService.setActiveMultiCoinWallet(params);
        dispatch(setActiveMulticoinWalletSuccess(multiCoinWallet));
        return multiCoinWallet;
    };
}

function getActiveMulticoinWallet(params) {
    return async dispatch => {
        const multiCoinWallet = await MulticoinService.getActiveMultiCoinWallet(params);
      console.log(multiCoinWallet);
        const wallet = await MultiWalletModule.fromPrivateKey(multiCoinWallet);
      console.log(wallet);
        dispatch(getActiveMulticoinWalletSuccess(wallet));
        return wallet;
    };
}

function reloadActiveMulticoinWallet(multicoinWallet, walletId) {
    return async dispatch => {
        const multiCoinWallet = await MulticoinService.reloadActiveMultiCoinWallet(multicoinWallet, walletId);
        dispatch(getActiveMulticoinWalletSuccess(multiCoinWallet));
        return multiCoinWallet;
    };
}

function reloadBalance(multicoinWallet) {
    return async dispatch => {
        const multiCoinWallet = await MulticoinService.reloadBalanceActiveMultiCoinWallet(multicoinWallet);

        dispatch(getActiveMulticoinWalletSuccess(multiCoinWallet));
        return multiCoinWallet;
    };
}

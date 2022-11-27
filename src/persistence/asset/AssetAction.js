import {AssetService} from '@persistence/asset/AssetService';
import {
    addAssetSuccess,
    getAssetsSuccess,
    removeAssetSuccess,
    setActiveAssetSuccess,
} from '@persistence/asset/AssetReducer';
import ExchangeModule from '@persistence/exchange/ExchangeModule';

export const AssetAction = {
    addAsset,
    removeAsset,
    list,
    setActiveAsset,
    sendAsset
};

function addAsset(chainId,wallet,token) {
    return async dispatch => {
        const balance = await ExchangeModule.tokenBalance(chainId,wallet,token);
        const isNotExists = await AssetService.addAsset(wallet.address, chainId,{...token,balance});
        if(isNotExists){
            dispatch(addAssetSuccess({...token,balance}));
        }

    };
}
function removeAsset(chainId,wallet,token) {
    return async dispatch => {
        const assets = await AssetService.removeAsset(wallet.address,chainId,token);
        dispatch(removeAssetSuccess(assets));
    };
}
function list(chainId,wallet) {
    return async dispatch => {
        const assets = await AssetService.list(wallet.address,chainId);
        const newAssets = [];
        for(let i = 0 ; i < assets.length ; i++){
            newAssets.push({
                ...assets[i],
                balance : await ExchangeModule.tokenBalance(chainId,wallet,assets[i])
            });
        }
        dispatch(getAssetsSuccess(newAssets));
    };
}
function setActiveAsset(chainId,wallet,token) {
    return async dispatch => {
        token.balance = await ExchangeModule.tokenBalance(chainId,wallet,token);
        dispatch(setActiveAssetSuccess(token));
    };
}
function sendAsset(wallet, toAddress, token,sendTokenAmount, gas) {
    return async dispatch => {
        //const result = await WalletModule.sendAsset(wallet,toAddress,token.address,sendTokenAmount,gas);
        //return result;
    };
}

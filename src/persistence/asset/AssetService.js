import _ from 'lodash';
import {StorageUtil} from '@components/utils/StorageUtil';
import {applicationProperties} from '@src/application.properties';

async function addAsset(address,chainId,token) {
    const assets = await StorageUtil.getItem(`ASSET_STORAGE_KEY_${address}_${chainId}`) || [];
    let flag = false;
    for(let i = 0 ; i < assets.length; i++){
        if(token.address == assets[i].address){
            flag = true;
            break;
        }
    }
    if(!flag){
        assets.push(token);
        await StorageUtil.setItem(`ASSET_STORAGE_KEY_${address}_${chainId}`,assets);
    }
    return !flag;
}
async function removeAsset(address,chainId,token) {
    const assets = await StorageUtil.getItem(`ASSET_STORAGE_KEY_${address}_${chainId}`) || [];
    _.remove(assets,function(asset){
        return asset.address == token.address;
    });
    await StorageUtil.setItem(`ASSET_STORAGE_KEY_${address}_${chainId}`,assets);
    return assets;
}
async function list(address,chainId) {
    const assets = await StorageUtil.getItem(`ASSET_STORAGE_KEY_${address}_${chainId}`) || [];
    if(assets.length == 0){
        for(let i = 0; i < applicationProperties.commonAssets.length;i++){
            if(applicationProperties.commonAssets[i].chainId == chainId){
                assets.push(applicationProperties.commonAssets[i]);
            }
        }
    }
    await StorageUtil.setItem(`ASSET_STORAGE_KEY_${address}_${chainId}`,assets);
    return assets;
}

export const AssetService = {
    addAsset,
    removeAsset,
    list
};

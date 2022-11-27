
import {ethers} from 'ethers';
import {applicationProperties} from '@src/application.properties';

const provider = ethers.getDefaultProvider(applicationProperties.networks[2].rpcUrl,applicationProperties.networks[2].apiKey);

function getProvider() {
    return provider;
}
async function getNetwork(){
    return await provider.getNetwork();
}
async function getGasPrice(){
    return await provider.getGasPrice();
}
async function estimateGas(transaction){
    return await provider.estimateGas(transaction);
}

async function ready(){
    return await provider.ready;
}

export const BscEtherProviderModule = {
    getProvider,
    getNetwork,
    getGasPrice,
    estimateGas,
    ready
};

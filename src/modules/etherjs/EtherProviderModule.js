import {applicationProperties} from '@src/application.properties';
import {ethers} from 'ethers';

const provider = ethers.getDefaultProvider(applicationProperties.networks[1].rpcUrl,applicationProperties.networks[1].apiKey);

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

export const EtherProviderModule = {
    getProvider,
    getNetwork,
    getGasPrice,
    estimateGas,
    ready
};

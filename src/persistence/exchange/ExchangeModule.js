import UniswapModule from '@modules/uniswap/UniswapModule';
import PancakeswapModule from '@modules/pancakeswap/PancakeswapModule';
import {applicationProperties} from '@src/application.properties';

const tokenBalance = async (chainId,wallet,token) => {
    if(chainId == applicationProperties.networks[2].chainId){
        return await PancakeswapModule.tokenBalance(wallet,token);
    }else if(chainId == applicationProperties.networks[1].chainId){
        return await UniswapModule.tokenBalance(wallet,token);
    }

}
const ExchangeModule = {
    tokenBalance
}
export default ExchangeModule;

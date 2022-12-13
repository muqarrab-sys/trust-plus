import PancakeswapModule from '@modules/pancakeswap/PancakeswapModule';
import UniswapModule from '@modules/uniswap/UniswapModule';
import {NETWORKS} from '@src/application.properties';

const tokenBalance = async (chainId, wallet, token) => {
  if (chainId == NETWORKS.bscNetwork.chainId) {
    return await PancakeswapModule.tokenBalance(wallet, token);
  } else if (chainId == NETWORKS.ethNetwork.chainId) {
    return await UniswapModule.tokenBalance(wallet, token);
  }
};
const ExchangeModule = {
  tokenBalance,
};
export default ExchangeModule;

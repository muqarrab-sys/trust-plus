import {TokenService} from '@persistence/token/TokenService';
import {getAllTokensSuccess, getTokensSuccess} from '@persistence/token/TokenReducer';
export const TokenAction = {
  getTokens,
  getAllTokens,
};

function getTokens(chainId) {
  return async dispatch => {
    const tokens = await TokenService.getTokens(chainId);
    const commonTokens = await TokenService.getCommonTokens(chainId);
    dispatch(getTokensSuccess([...commonTokens, ...tokens]));
    return [...commonTokens, ...tokens];
  };
}
function getAllTokens(chainIds) {
  return async dispatch => {
    const tokens = await TokenService.getAllTokens(chainIds);
    dispatch(getAllTokensSuccess(tokens));
    return tokens;
  };
}

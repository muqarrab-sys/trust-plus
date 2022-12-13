import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
const MulticoinReducer = createSlice({
  name: 'multicoin',
  initialState: {
    multiCoinWallets: [],
    activeMulticoinWallet: {wallets: []},
  },
  reducers: {
    listSuccess(state, {payload}) {
      state.multiCoinWallets = payload;
    },
    addSuccess(state, {payload}) {
      state.multiCoinWallets = payload;
    },
    setActiveMulticoinWalletSuccess(state, {payload}) {
      state.activeMulticoinWallet = {...state.activeMulticoinWallet, ...payload};
    },
    getActiveMulticoinWalletSuccess(state, {payload}) {
      const uniqueWallets = _.uniqBy([...payload.wallets, ...state.activeMulticoinWallet.wallets], function (e) {
        return e.symbol;
      });
      state.activeMulticoinWallet = {...state.activeMulticoinWallet, ...payload, wallets: uniqueWallets};
    },
  },
});
// Extract the action creators object and the reducer
const {actions, reducer} = MulticoinReducer;
// Extract and export each action creator by name
export const {listSuccess, addWalletSuccess, addSuccess, setActiveMulticoinWalletSuccess, getActiveMulticoinWalletSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;

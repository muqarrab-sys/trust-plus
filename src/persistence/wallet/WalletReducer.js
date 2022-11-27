import {createSlice} from '@reduxjs/toolkit';

const WalletReducer = createSlice({
    name: 'wallet',
    initialState: {
        wallets: [],
        activeWallet : {},
        transactions : [],
        tokenTransactions : []
    },
    reducers: {
        addWalletSuccess(state, {payload}) {
            state.wallets = [payload,...state.wallets];
        },
        setActiveWalletSuccess(state, {payload}) {
            state.activeWallet = {...payload};
        },
        getTransactionsSuccess(state, {payload}) {
            state.transactions = payload;
        },
        getTokenTransactionsSuccess(state, {payload}) {
            state.tokenTransactions = payload;
        },
        getWalletsSuccess(state, {payload}) {
            state.wallets = payload;
        },
    },
})
// Extract the action creators object and the reducer
const { actions, reducer } = WalletReducer;
// Extract and export each action creator by name
export const { addWalletSuccess,setActiveWalletSuccess,setRawActiveWalletSuccess,getTransactionsSuccess,getWalletsSuccess,getTokenTransactionsSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;


import {createSlice} from '@reduxjs/toolkit';

const TokenReducer = createSlice({
    name: 'token',
    initialState: {
        tokens : [],
        allTokens: []
    },
    reducers: {
        getTokensSuccess(state, {payload}) {
            state.tokens = payload;
        },
        getAllTokensSuccess(state, {payload}) {
            state.allTokens = payload;
        },
    },
})
// Extract the action creators object and the reducer
const { actions, reducer } = TokenReducer;
// Extract and export each action creator by name
export const {getTokensSuccess,getAllTokensSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;

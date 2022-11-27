import {createSlice} from '@reduxjs/toolkit';

const AssetReducer = createSlice({
    name: 'asset',
    initialState: {
        assets: [],
        activeAsset : {}
    },
    reducers: {
        addAssetSuccess(state, {payload}) {
            state.assets = [payload,...state.assets];
        },
        removeAssetSuccess(state, {payload}) {
            state.assets = payload;
        },
        getAssetsSuccess(state, {payload}) {
            state.assets = payload;
        },
        setActiveAssetSuccess (state, {payload}) {
            state.activeAsset = payload;
        },
    },
});
// Extract the action creators object and the reducer
const {actions, reducer} = AssetReducer;
// Extract and export each action creator by name
export const {addAssetSuccess,removeAssetSuccess,getAssetsSuccess,setActiveAssetSuccess
} = actions;
// Export the reducer, either as a default or named export
export default reducer;

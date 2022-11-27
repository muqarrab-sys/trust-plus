import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import LanguageReducer from '@persistence/language/LanguageReducer';
import ThemeReducer from '@persistence/theme/ThemeReducer';
import UserReducer from '@persistence/user/UserReducer';
import CurrencyReducer from '@persistence/currency/CurrencyReducer';
import TokenReducer from '@persistence/token/TokenReducer';
import WalletReducer from '@persistence/wallet/WalletReducer';
import AssetReducer from '@persistence/asset/AssetReducer';

const ReduxStore = configureStore({
    reducer: {
        LanguageReducer,
        ThemeReducer,
        UserReducer,
        WalletReducer,
        CurrencyReducer,
        TokenReducer,
        AssetReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export default ReduxStore;

import {createSlice} from '@reduxjs/toolkit';
import {applicationProperties} from '@src/application.properties';
import {Languages} from '@persistence/language/data/lang';
const LanguageReducer = createSlice({
  name: 'language',
  initialState: {
    language: Languages[applicationProperties.defaultLanguage.code],
    languages: applicationProperties.languages,
    defaultLanguage: applicationProperties.defaultLanguage,
  },
  reducers: {
    changeSuccess(state, {payload}) {
      state.language = Languages[payload];
    },
    listSuccess(state, {payload}) {
      state.languages = payload;
    },
    changeDefaultSuccess(state, {payload}) {
      state.defaultLanguage = payload;
    },
  },
});
// Extract the action creators object and the reducer
const {actions, reducer} = LanguageReducer;
// Extract and export each action creator by name
export const {changeSuccess, listSuccess, changeDefaultSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;

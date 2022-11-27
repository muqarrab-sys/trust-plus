import React from 'react';
import {StorageUtil} from '@components/utils/StorageUtil';
import {applicationProperties} from '@src/application.properties';

export const LanguageService = {
  set,
  get,
  list,
  setDefault,
  getDefault,
};

async function get() {
  return applicationProperties.defaultLanguage.code;
}

async function set(lang) {
  return await StorageUtil.setItem('lang', lang);
}

async function list() {
  return applicationProperties.languages;
}
async function setDefault(language) {
  await StorageUtil.setItem('defaultLang', language);
}

async function getDefault() {
  return (
    (await StorageUtil.getItem('defaultLang')) ||
    applicationProperties.defaultLanguage
  );
}

import _ from 'lodash';
import cryptocompare from 'cryptocompare';
import {StorageUtil} from '@components/utils/StorageUtil';
import {applicationProperties} from '@src/application.properties';

async function getCurrency(to) {
  let currency = await StorageUtil.getItem('defaultCurrency');
  if (_.isNil(currency)) {
    currency = applicationProperties.defaultCurrency;
  }
  await StorageUtil.setItem('defaultCurrency', to || currency);
  const key = to ? to.key : currency.key;
  return await cryptocompare.price('USD', key);
}
export const CurrencyService = {
  getCurrency,
};

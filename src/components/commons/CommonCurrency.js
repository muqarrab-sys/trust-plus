import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import NumberFormat from 'react-number-format';

export default function CommonCurrency({...rest}) {
  const {currency} = useSelector(state => state.CurrencyReducer);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {value, decimalScale, style} = {...rest};
  const fiatUnit = currency.key || 'USD';
  let toFiatValue = value;
  if (fiatUnit != 'USD') {
    toFiatValue = value * currency.value;
  }
  return (
    <NumberFormat
      value={toFiatValue}
      displayType={'text'}
      thousandSeparator={true}
      decimalScale={decimalScale || 2}
      fixedDecimalScale={decimalScale || 2}
      renderText={value => (
        <CommonText style={style}>
          {value} <CommonText style={[styles.unit, {color: theme.textColor3}]}>{fiatUnit}</CommonText>
        </CommonText>
      )}
    />
  );
}
const styles = StyleSheet.create({
  main: {
    fontSize: 14,
  },
  convert: {
    fontSize: 14,
    color: 'gray',
  },
  unit: {
    fontSize: 12,
  },
});

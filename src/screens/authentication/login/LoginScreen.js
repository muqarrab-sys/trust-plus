import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Root} from 'popup-ui';
import PINCode from '@haskkor/react-native-pincode';
import {useDispatch, useSelector} from 'react-redux';
import {UserAction} from '@persistence/user/UserAction';
import CommonLoading from '@components/commons/CommonLoading';
import {CurrencyAction} from '@persistence/currency/CurrencyAction';
import {WalletAction} from '@persistence/wallet/WalletAction';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.ThemeReducer);
  return (
    <Root>
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <PINCode
          touchIDDisabled={true}
          colorPassword={theme.buttonColor1}
          styleAlphabet={{color: theme.buttonColor1}}
          numbersButtonOverlayColor={theme.buttonColor1}
          status={'enter'}
          passwordLength={6}
          finishProcess={pinCode => {
            CommonLoading.show();
            dispatch(WalletAction.getActiveWallet()).then(multiCoinWallet => {
              dispatch(CurrencyAction.getCurrency()).then(() => {
                dispatch(UserAction.signIn({}));
                CommonLoading.hide();
              });
            });
          }}
        />
      </SafeAreaView>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
  },
});

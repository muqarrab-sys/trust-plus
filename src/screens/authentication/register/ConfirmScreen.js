import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Root} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import CommonText from '@components/commons/CommonText';
import CommonButton from '@components/commons/CommonButton';
import CommonToast from '@components/commons/CommonToast';
import CommonLoading from '@components/commons/CommonLoading';
import _ from 'lodash';
import {applicationProperties} from '@src/application.properties';
import {WalletAction} from '@persistence/wallet/WalletAction';
import uuid from 'react-native-uuid';
import {CurrencyAction} from '@persistence/currency/CurrencyAction';
import {UserAction} from '@persistence/user/UserAction';
import CommonHeader from '@components/commons/CommonHeader';

export default function ConfirmScreen({navigation, route}) {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {mnemonics} = route.params;
  const [selectable, setSelectable] = useState(_.shuffle([...mnemonics]));
  const [selected, setSelected] = useState([]);
  const [isValid, setIsValid] = useState(false);
  console.log('selected===>>>', selected);
  console.log('selectable===>>>', selectable);

  useEffect(() => {}, []);

  const onPressMnemonic = (mnemonic, isSelected) => {
    console.log('isSelected===>>', isSelected);

    if (isSelected) {
      if (selected.length === (mnemonics.length - 1) && _.isEqual([...selected, mnemonic], mnemonics)) {
        setIsValid(true);
      }
      setSelectable(selectable.filter(m => m !== mnemonic));
      setSelected(selected.concat([mnemonic]));
    } else {
      setIsValid(false);
      setSelectable(selectable.concat([mnemonic]));
      setSelected(selected.filter(m => m !== mnemonic));
    }
  };
  const renderMnemonic = (mnemonic, index, selected) => (
    <TouchableOpacity
      style={[styles.mnemonic, {backgroundColor: theme.backgroundColor1}]}
      key={index}
      onPress={() => {
        onPressMnemonic(mnemonic, selected);
      }}>
          <View style={{width: '80%'}}>
              <CommonText style={{textAlign: 'center', fontWeight : '400', fontSize: 12}}>
                  <CommonText style={{color: '#8C8C8C'}}>{index + 1}  </CommonText>
                  <CommonText>{mnemonic}</CommonText>
              </CommonText>
          </View>
    </TouchableOpacity>
  );
  const renderSelectableMnemonic = (mnemonic, index, selected) => (
    <TouchableOpacity
      style={[
        styles.selectableMnemonic,
        {backgroundColor: theme.backgroundColor1},
      ]}
      key={index}
      onPress={() => {
        onPressMnemonic(mnemonic, selected);
      }}>
        <View style={{width: '80%'}}>
          <CommonText style={{textAlign: 'center', fontWeight : '400', fontSize: 12}}>{mnemonic}</CommonText>
        </View>
    </TouchableOpacity>
  );
  const renderSelected = () => {
    return (
      <View style={[styles.selectedMnemonicsContainer, {backgroundColor: theme.backgroundColor4}]}>
        <View style={styles.mnemonicsContainer}>
          {selected.slice(0, 11).map((mnemonic, index) => renderMnemonic(mnemonic, index, false))}
        </View>
        <View style={styles.mnemonicsContainer}>
          {selected[11] && renderMnemonic(selected[11], 11, false)}
        </View>
        <View style={styles.errorContainer}>
          {selected.length === 12 && (
            isValid
                ? <CommonText style={{color: theme.successText, fontSize: 12}}>{lang.goodJob}</CommonText>
                : <CommonText style={{color: theme.warningText2, fontSize: 12}}>{lang.isIncorrectOrder}</CommonText>
          )}
        </View>
      </View>
    )
  }

  const renderSelectable = () => (
    <>
      <View style={styles.selectableMnemonicsContainer}>
        {selectable.slice(0, 11).map((mnemonic, index) => renderSelectableMnemonic(mnemonic, index, true))}
      </View>
      <View style={styles.selectableMnemonicsContainer}>
          {selectable[11] && renderSelectableMnemonic(selectable[11], 11, true)}
      </View>
    </>
  );
  const isValidSequence = () => {
    return _.isEqual(mnemonics, selected);
  };
  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <CommonHeader onPressBack={() => navigation.goBack()} title={lang.yourRecoveryPhrase} />
        <View
          style={[
            styles.layerContainer,
            {backgroundColor: theme.backgroundColor1},
          ]}>
          <View style={styles.logoContainer}>
            <CommonText style={{color: theme.textColor2, textAlign: 'center'}}>
              {lang.tapTheWord}
            </CommonText>
          </View>
          <View style={styles.contentContainer}>{renderSelected()}</View>
          <View style={styles.buttonContainer}>
            <View style={styles.row}>{renderSelectable()}</View>
            <View style={styles.row}>
              <CommonButton
                label={lang.continue}
                onPress={async () => {
                  console.log('isValidSequence===>>>', isValid);
                  if (!isValid) {
                    CommonToast.error({
                      title: lang.error,
                      text: lang.yourSeedPhraseOrderIsIncorrect,
                    });
                    return;
                  }
                  if (selected.length && mnemonics) {
                    CommonLoading.show();
                    const btcWallet = {
                      id: uuid.v4(),
                      name: 'Bitcoin Wallet 1',
                      balance: 0.0,
                      network: applicationProperties?.activeNetwork,
                      mnemonics: mnemonics.join(' '),
                      logoURI: applicationProperties?.activeNetwork?.logoURI,
                    };
                    dispatch(WalletAction?.addBtcWallet(btcWallet)).then(
                      response => {
                        console.log('response.success===>>>', response);
                        if (response?.success) {
                          dispatch(
                            WalletAction.setActiveWallet(response.btcWallet),
                          ).then(() => {
                            console.log('response.btcWallet===>>>');
                            dispatch(CurrencyAction.getCurrency()).then(() => {
                              dispatch(UserAction.signIn({}));
                              CommonLoading.hide();
                            });
                          });
                        } else {
                          console.log('CommonToast?.error', CommonToast?.error);
                          CommonToast?.error({
                            title: lang.error,
                            text: lang.somethingWentWrongTryAgainLater,
                          });
                        }
                      },
                    );
                  } else {
                    ('');
                  }
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Root>
  );
}
const styles = StyleSheet.create({
  selectableMnemonicsContainer: {
    width: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  selectedMnemonicsContainer: {
    width: '100%',
    height: 250,
    borderRadius: 5,
  },
  selectableMnemonic: {
    width: 90,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#3c77b6',
    margin: 2,
  },

  header: {
    height: 50,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  topBackBg: {
    height: 250,
    width: '100%',
    backgroundColor: '#F0B90B',
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  layerContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  logoContainer: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 2,
    padding: 10,
  },
  row: {
    width: '100%',
    marginBottom: 10,
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mnemonicsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  overlayMnemonics: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mnemonic: {
    margin: 5,
    width: 90,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#D9D9D9',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  errorContainer: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 10,
  },
});

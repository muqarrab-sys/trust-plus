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
import {AssetAction} from '@persistence/asset/AssetAction';

export default function AddWalletStep3Screen({navigation, route}) {
  const {item} = route.params;
  const dispatch = useDispatch();
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {mnemonics} = route.params;
  const [selectable, setSelectable] = useState(_.shuffle([...mnemonics]));
  const [selected, setSelected] = useState([]);
  const {wallets} = useSelector(state => state.WalletReducer);
  useEffect(() => {}, []);

  const onPressMnemonic = (mnemonic, isSelected) => {
    if (isSelected) {
      setSelectable(selectable.filter(m => m !== mnemonic));
      setSelected(selected.concat([mnemonic]));
    } else {
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
        <CommonText style={{textAlign: 'left'}}>
          {index + 1}. {mnemonic}
        </CommonText>
      </View>
    </TouchableOpacity>
  );
  const renderSelectableMnemonic = (mnemonic, index, selected) => (
    <TouchableOpacity
      style={[styles.selectableMnemonic, {backgroundColor: theme.backgroundColor1}]}
      key={index}
      onPress={() => {
        onPressMnemonic(mnemonic, selected);
      }}>
      <CommonText>{mnemonic}</CommonText>
    </TouchableOpacity>
  );
  const renderSelected = () => (
    <View style={styles.mnemonicsContainer}>
      {selected.map((mnemonic, index) => {
        return renderMnemonic(mnemonic, index, false);
      })}
    </View>
  );

  const renderSelectable = () => (
    <View style={styles.selectableMnemonicsContainer}>
      {selectable.map((mnemonic, index) => {
        return renderSelectableMnemonic(mnemonic, index, true);
      })}
    </View>
  );
  const isValidSequence = () => {
    return _.isEqual(mnemonics, selected);
  };
  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <View style={styles.header}>
          <CommonBackButton
            color={'black'}
            onPress={async () => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={[styles.layerContainer, {backgroundColor: theme.backgroundColor1}]}>
          <View style={styles.logoContainer}>
            <CommonText style={{fontSize: 30}}>{lang.verifyRecoveryPhrase}</CommonText>
            <CommonText style={{color: theme.textColor2, textAlign: 'center'}}>{lang.tapTheWord}</CommonText>
          </View>
          <View style={styles.contentContainer}>{renderSelected()}</View>
          <View style={styles.buttonContainer}>
            <View style={styles.row}>{renderSelectable()}</View>
            <View style={styles.row}>
              <CommonButton
                label={lang.continue}
                onPress={async () => {
                  if (!isValidSequence()) {
                    CommonToast.error({
                      title: lang.error,
                      text: lang.yourSeedPhraseOrderIsIncorrect,
                    });
                    return;
                  }
                  CommonLoading.show();
                  if (item.symbol == 'BTC') {
                    const btcWallet = {
                      id: uuid.v4(),
                      name: 'Bitcoin Wallet ' + (wallets.length + 1),
                      balance: 0.0,
                      network: applicationProperties.activeNetwork,
                      mnemonics: mnemonics.join(' '),
                      logoURI: applicationProperties.activeNetwork.logoURI,
                    };
                    dispatch(WalletAction.addBtcWallet(btcWallet)).then(response => {
                      if (response.success) {
                        dispatch(WalletAction.setActiveWallet(response.btcWallet)).then(() => {
                          dispatch(AssetAction.list(response.btcWallet.network.chainId, response.btcWallet.wallet));
                          CommonLoading.hide();
                          navigation.pop(3);
                        });
                      } else {
                        CommonToast.error({
                          title: lang.error,
                          text: lang.somethingWentWrongTryAgainLater,
                        });
                      }
                    });
                  } else if (item.symbol == 'ETH') {
                    const ethWallet = {
                      id: uuid.v4(),
                      name: 'Ethereum Wallet ' + (wallets.length + 1),
                      balance: 0.0,
                      network: applicationProperties.networks[1],
                      mnemonics: mnemonics.join(' '),
                      logoURI: applicationProperties.networks[1].logoURI,
                    };
                    dispatch(WalletAction.addEthWallet(ethWallet)).then(response => {
                      if (response.success) {
                        dispatch(WalletAction.setActiveWallet(response.ethWallet)).then(() => {
                          dispatch(AssetAction.list(response.ethWallet.network.chainId, response.ethWallet.wallet));
                          CommonLoading.hide();
                          navigation.pop(3);
                        });
                      } else {
                        CommonToast.error({
                          title: lang.error,
                          text: lang.somethingWentWrongTryAgainLater,
                        });
                      }
                    });
                  } else if (item.symbol == 'BNB') {
                    const bnbWallet = {
                      id: uuid.v4(),
                      name: 'BNB Wallet ' + (wallets.length + 1),
                      balance: 0.0,
                      network: applicationProperties.networks[2],
                      mnemonics: mnemonics.join(' '),
                      logoURI: applicationProperties.networks[2].logoURI,
                    };
                    dispatch(WalletAction.addBnbWallet(bnbWallet)).then(response => {
                      if (response.success) {
                        dispatch(WalletAction.setActiveWallet(response.bscWallet)).then(() => {
                          CommonLoading.hide();
                          navigation.pop(3);
                        });
                      } else {
                        CommonToast.error({
                          title: lang.error,
                          text: lang.somethingWentWrongTryAgainLater,
                        });
                      }
                    });
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
  selectableMnemonic: {
    width: 70,
    height: 35,
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
    width: 130,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#3c77b6',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

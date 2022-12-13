import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Root} from 'popup-ui';
import CommonText from '@components/commons/CommonText';
import CommonButton from '@components/commons/CommonButton';
import CommonToast from '@components/commons/CommonToast';
import CommonLoading from '@components/commons/CommonLoading';
import _ from 'lodash';
import {applicationProperties} from '@src/application.properties';
import {CurrencyAction} from '@persistence/currency/CurrencyAction';
import {UserAction} from '@persistence/user/UserAction';
import CommonHeader from '@components/commons/CommonHeader';
import {MulticoinAction} from '@persistence/multicoin/MulticoinAction';

export default function ConfirmScreen({navigation, route}) {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {mnemonics} = route.params;
  const [selectable, setSelectable] = useState(_.shuffle([...mnemonics]));
  const [selected, setSelected] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const onPressMnemonic = (mnemonic, isSelected) => {
    if (isSelected) {
      if (selected.length === mnemonics.length - 1 && _.isEqual(selected.concat(mnemonic), mnemonics)) {
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
        <CommonText style={{textAlign: 'center', fontWeight: '400', fontSize: 12}}>
          <CommonText style={{color: '#8C8C8C'}}>{index + 1} </CommonText>
          <CommonText>{mnemonic}</CommonText>
        </CommonText>
      </View>
    </TouchableOpacity>
  );
  const renderSelectableMnemonic = (mnemonic, index, selected) => (
    <TouchableOpacity
      style={[styles.mnemonic, styles.selectableMnemonic, {backgroundColor: theme.backgroundColor1}]}
      key={index}
      onPress={() => {
        onPressMnemonic(mnemonic, selected);
      }}>
      <View style={{width: '80%'}}>
        <CommonText style={{textAlign: 'center', fontWeight: '400', fontSize: 12}}>{mnemonic}</CommonText>
      </View>
    </TouchableOpacity>
  );
  const renderSelected = () => {
    return (
      <View style={[styles.selectedMnemonicsContainer, {backgroundColor: theme.backgroundColor4}]}>
        <View style={styles.mnemonicsContainer}>{selected.slice(0, 11).map((mnemonic, index) => renderMnemonic(mnemonic, index, false))}</View>
        <View style={styles.mnemonicsContainer}>{selected[11] && renderMnemonic(selected[11], 11, false)}</View>
        <View style={styles.errorContainer}>
          {selected.length === 12 &&
            (isValid ? (
              <CommonText style={{color: theme.successText, fontSize: 12}}>{lang.goodJob}</CommonText>
            ) : (
              <CommonText style={{color: theme.warningText2, fontSize: 12}}>{lang.isIncorrectOrder}</CommonText>
            ))}
        </View>
      </View>
    );
  };
  const renderSelectable = () => (
    <>
      <View style={styles.selectableMnemonicsContainer}>
        {selectable.slice(0, 11).map((mnemonic, index) => renderSelectableMnemonic(mnemonic, index, true))}
      </View>
      <View style={styles.selectableMnemonicsContainer}>{selectable[11] && renderSelectableMnemonic(selectable[11], 11, true)}</View>
    </>
  );

  const onCreateWallet = async () => {
    if (!isValid) {
      return CommonToast.error({title: lang.error, text: lang.yourSeedPhraseOrderIsIncorrect});
    }

    CommonLoading.show();

    const params = {
      mnemonics: mnemonics.join(' '),
      network: applicationProperties?.networks[0],
      name: 'My Wallet',
    };

    dispatch(MulticoinAction?.add(params)).then(response => {
      if (response?.success) {
        dispatch(MulticoinAction?.setActiveMulticoinWallet(response.data)).then(() => {
          dispatch(CurrencyAction.getCurrency()).then(() => {
            dispatch(UserAction.signIn({}));
            CommonLoading.hide();
          });
        });
      } else {
        CommonLoading.hide();
        console.Error('Error creating multicoin wallet');
        CommonToast?.error({
          title: lang.error,
          text: lang.somethingWentWrongTryAgainLater,
        });
      }
    });
  };

  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <CommonHeader onPressBack={() => navigation.goBack()} title={lang.yourRecoveryPhrase} />
        <View style={[styles.layerContainer, {backgroundColor: theme.backgroundColor1}]}>
          <View style={styles.selectedContainer}>
            <CommonText style={{color: theme.textColor2, textAlign: 'center'}}>{lang.tapTheWord}</CommonText>
            {renderSelected()}
          </View>
          <View style={styles.selectableContainer}>{renderSelectable()}</View>
          <View style={styles.BottomButtonContainer}>
            <CommonButton label={lang.continue} onPress={onCreateWallet} />
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
  mnemonic: {
    width: 90,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    margin: 5,
    borderColor: '#D9D9D9',
  },
  selectableMnemonic: {
    margin: 2,
    borderColor: '#3c77b6',
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
  selectedContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 5,
    padding: 10,
  },
  selectableContainer: {
    width: '100%',
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  BottomButtonContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
  errorContainer: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 10,
  },
});

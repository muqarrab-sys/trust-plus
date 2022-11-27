import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonImage from '@components/commons/CommonImage';
import CommonTextInput from '@components/commons/CommonTextInput';
import CommonButton from '@components/commons/CommonButton';
import CommonLoading from '@components/commons/CommonLoading';
import uuid from 'react-native-uuid';
import {applicationProperties} from '@src/application.properties';
import {MulticoinAction} from '@persistence/multicoin/MulticoinAction';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {CommonUtil} from '@components/utils/CommonUtil';
import * as bip39 from 'bip39';
import {UserAction} from '@persistence/user/UserAction';
yup.addMethod(yup.string, 'isMnemonics', function (errorMessage) {
  return this.test(`test-mnemonics`, errorMessage, function (value) {
    const {path, createError} = this;
    return (
      bip39.validateMnemonic(value) ||
      createError({path, message: errorMessage})
    );
  });
});

export default function MultiCoinScreen({navigation, route}) {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const schema = yup.object().shape({
    mnemonics: yup
      .string()
      .required(lang.phrase + ' ' + lang.isARequiredField)
      .isMnemonics(lang.phrase + ' ' + lang.isIncorrect),
    name: yup.string().required(lang.name + ' ' + lang.isARequiredField),
  });
  const {control, setValue, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {});
  const onSubmit = async ({mnemonics, name}) => {
    CommonLoading.show();
    await CommonUtil.sleep(1000);
    const params = {
      id: uuid.v4(),
      name: name,
      balance: 0.0,
      network: applicationProperties.btcNetwork,
      mnemonics: mnemonics.trim(),
    };
    dispatch(MulticoinAction.add(params)).then(({success, data}) => {
      if (success) {
        dispatch(MulticoinAction.setActiveMulticoinWallet(data)).then(
          multiCoinWallet => {
            dispatch(UserAction.signIn({}));
            CommonLoading.hide();
          },
        );
      }
      CommonLoading.hide();
    });
  };
  const renderItem = ({item}) => {
    return (
      <CommonTouchableOpacity
        style={styles.item}
        onPress={() => {}}
        key={item.id.toString()}>
        <View
          style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
          <CommonImage
            source={{uri: item.logoURI}}
            resizeMode={'contain'}
            style={{width: 32, height: 32}}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CommonText style={{fontSize: 14}}>{item.name}</CommonText>
        </View>
      </CommonTouchableOpacity>
    );
  };
  return (
    <Root>
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <View style={[styles.header, {backgroundColor: theme.mainColor}]}>
          <CommonBackButton
            color={'white'}
            onPress={async () => {
              navigation.goBack();
            }}
          />
          <CommonText style={styles.title}>{lang.importMultiCoin}</CommonText>
          <View style={{width: 40}}></View>
        </View>
        <View style={styles.contentContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CommonTextInput
                label={lang.name}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                error={errors['name']}
              />
            )}
            name="name"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CommonTextInput
                label={lang.phrase}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                error={errors['mnemonics']}
                multiline={true}
                height={100}
              />
            )}
            name="mnemonics"
            defaultValue=""
          />
          <View style={styles.row}>
            <CommonText style={{color: theme.textColor2}}>
              {lang.typically12}
            </CommonText>
          </View>
          <View style={styles.row}>
            <CommonButton
              label={lang.import.toUpperCase()}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
        <CommonTouchableOpacity style={[styles.row, {alignItems: 'center'}]}>
          <CommonText style={{color: theme.textColor2}}>
            {lang.whatIsRecoveryPhrase}
          </CommonText>
        </CommonTouchableOpacity>
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
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  row: {
    minHeight: 100,
    justifyContent: 'center',
  },
});

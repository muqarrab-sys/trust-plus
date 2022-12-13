import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import LoginScreen from '@screens/authentication/login/LoginScreen';
import RegisterScreen from '@screens/authentication/register/RegisterScreen';
import {hasUserSetPinCode, deleteUserPinCode} from '@haskkor/react-native-pincode';
import {StorageUtil} from '@components/utils/StorageUtil';
import _ from 'lodash';

export default function EntryScreen({navigation}) {
  const [isLogin, setIsLogin] = useState(undefined);
  const isPinCodeSet = async () => {
    const data = await hasUserSetPinCode();
    setIsLogin(data);
  };
  useEffect(() => {
    (async () => {
      const loggedIn = _.isNil(await StorageUtil.getItem('loggedIn')) ? false : true;
      if (!loggedIn) {
        await deleteUserPinCode();
      }
      await isPinCodeSet();
    })();
  });
  if (_.isNil(isLogin)) {
    return <View />;
  }
  if (isLogin) {
    return <LoginScreen navigation={navigation} />;
  }
  return <RegisterScreen navigation={navigation} />;
}

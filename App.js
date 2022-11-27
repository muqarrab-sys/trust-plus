import React, {useEffect} from 'react';
import './global';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import {LogBox, StatusBar} from 'react-native';
import ApplicationNavigator from '@modules/navigation/ApplicationNavigator';
import ReduxStore from '@modules/redux/ReduxStore';
import CommonLoading from '@components/commons/CommonLoading';
import CommonSelect from '@components/commons/CommonSelect';
import CommonAlert from '@components/commons/CommonAlert';
import SplashScreen from 'react-native-splash-screen';
enableScreens();
LogBox.ignoreLogs(['Warning: Cannot']);
LogBox.ignoreLogs(['component']);
LogBox.ignoreLogs(['Clipboard']);
LogBox.ignoreLogs(['RCTUI']);
LogBox.ignoreLogs(['[auth/p']);
LogBox.ignoreLogs(['[User cancelled the login process']);
LogBox.ignoreLogs(['Require cycles are allowed']);
LogBox.ignoreLogs(['Setting a timer for a long']);
LogBox.ignoreLogs(['formState.isValid']);
LogBox.ignoreLogs(['RCTBridge required dispatch_sync']);
LogBox.ignoreLogs(['View']);
LogBox.ignoreAllLogs(true);
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={ReduxStore}>
      <StatusBar hidden={false} backgroundColor={'#105BAA'} barStyle={'dark-content'} />
      <ApplicationNavigator />
      <CommonLoading ref={ref => CommonLoading.setRef(ref)} />
      <CommonSelect ref={ref => CommonSelect.setRef(ref)} />
      <CommonAlert ref={ref => CommonAlert.setRef(ref)} />
    </Provider>
  );
}

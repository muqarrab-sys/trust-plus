import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonButton from '@components/commons/CommonButton';
import {Root} from 'popup-ui';

export default function RegisterScreen({navigation}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
      <View style={styles.contentContainer}>
        <View style={styles.slider}>
          <Swiper showsButtons={false} loop={false}>
            <View style={styles.sliderImage}>
              <Image source={require('@assets/swiper/01.png')} style={{width: 388, height: 388}} resizeMode={'contain'} />
              <CommonText style={{fontSize: 30}}>{lang.safeAndSecure}</CommonText>
              <CommonText>{lang.privateKeysNeverLeaveYourDevice}</CommonText>
            </View>
            <View style={styles.sliderImage}>
              <Image source={require('@assets/swiper/02.png')} style={{width: 388, height: 388}} resizeMode={'contain'} />
              <CommonText style={{fontSize: 30}}>{lang.allAssetsInOncePlace}</CommonText>
              <CommonText>{lang.viewAndStoreSeamlessly}</CommonText>
            </View>
            <View style={styles.sliderImage}>
              <Image source={require('@assets/swiper/03.png')} style={{width: 388, height: 388}} resizeMode={'contain'} />
              <CommonText style={{fontSize: 30}}>{lang.tradeAssets}</CommonText>
              <CommonText>{lang.tradeYourAssetsAnonymously}</CommonText>
            </View>
            <View style={styles.sliderImage}>
              <Image source={require('@assets/swiper/04.png')} style={{width: 388, height: 388}} resizeMode={'contain'} />
              <CommonText style={{fontSize: 30}}>{lang.exploreDecentralizedApps}</CommonText>
              <CommonText>{lang.makeYourDreamsComeTrue}</CommonText>
            </View>
          </Swiper>
        </View>
      </View>
      <View style={[{flex: 1, backgroundColor: theme.backgroundColor1}]}>
        <View style={[styles.bottomContainer, {backgroundColor: theme.backgroundColor1}]}>
          <View style={[styles.buttonsContainer, {marginBottom: 5}]}>
            <CommonButton
              label={lang.createANewWallet}
              onPress={() => {
                navigation.navigate('PasscodeScreen', {nextScreen: 'MnemonicsScreen'});
              }}
            />
          </View>
          <View style={[styles.buttonsContainer, {backgroundColor: theme.backgroundColor1}]}>
            <CommonButton
              label={lang.iHaveAWallet}
              onPress={() => {
                navigation.navigate('PasscodeScreen', {nextScreen: 'ImportScreen'});
              }}
              style={{backgroundColor: '#fff'}}
              labelStyle={{color: theme.buttonTextColor2}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
  },
  header: {
    height: 50,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  contentContainer: {
    flex: 4,
  },
  block: {
    width: '100%',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
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
  image: {
    position: 'absolute',
    width: '100%',
    height: 300,
  },
  loginBg: {
    width: '100%',
    height: 370,
  },
  mnemonic: {
    margin: 14,
    width: 130,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurBackground: {
    width: '100%',
    height: 549,
    position: 'absolute',
    bottom: 0,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
});

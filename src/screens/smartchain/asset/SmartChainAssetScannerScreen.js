import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import _ from 'lodash';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useSelector} from 'react-redux';

export default function SmartChainAssetScannerScreen({navigation,route}){
    const {screenName, onCallback} = route.params;
    const {theme} = useSelector(state => state.ThemeReducer);
    const onSuccess = e => {
        if(_.isNil(onCallback)){
            navigation.pop();
            navigation.navigate(screenName, {
                qrCodeAddress : e.data
            });
        }else{
            onCallback(e.data);
            navigation.goBack();
        }
    };
    return (
        <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
            <View style={styles.header}>
                <CommonBackButton color={'black'} onPress={() => {
                    navigation.goBack();
                }}/>
            </View>
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.auto}
                fadeIn={false}
                showMarker={true}
            />
        </SafeAreaView>
    )
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
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    logo : {
        width : 70,
        height : 50,
    },
});

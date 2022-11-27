import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonTokenIcon from '@components/commons/CommonTokenIcon';
import ArrowUp from '@components/icons/ArrowUp';
import ArrowDown from '@components/icons/ArrowDown';
import Time from '@components/icons/Time';
import CommonBackButton from '@components/commons/CommonBackButton';
import CommonNumber from '@components/commons/CommonNumber';


export default function SmartChainAssetScreen({navigation,route}){
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.LanguageReducer.language);
    const { theme } = useSelector((state) => state.ThemeReducer);
    const {activeWallet} = useSelector((state) => state.WalletReducer);
    const {activeAsset} = useSelector((state) => state.AssetReducer);
    useEffect( () => {
        (()=> {

        })();
    }, []);
    return (
        <SafeAreaView style={[styles.container,{backgroundColor : theme.mainColor}]}>
            <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                <CommonBackButton color={'white'} onPress={() => {
                    navigation.goBack();
                }}/>
                <CommonTokenIcon uri={activeAsset.logoURI} resizeMode={'contain'} style={{width: 32, height: 32}}/>
            </View>
            <View style={styles.balance}>
                <CommonNumber decimalScale={activeAsset.decimals/4} style={[styles.balanceText,{color: theme.textColor3}]} value={activeAsset.balance.val} symbol={activeAsset.symbol}></CommonNumber>
                <CommonText style={[styles.walletText,{color: theme.textColor3}]}>{activeAsset.name}</CommonText>
            </View>
            <View style={styles.controlContainer}>
                <View style={styles.control}>
                    <CommonTouchableOpacity style={styles.element} onPress={()=> {
                        navigation.navigate("SmartChainAssetSendScreen");
                    }}>
                        <View style={styles.elementIcon}>
                            <ArrowUp/>
                        </View>
                        <CommonText style={{color : theme.textColor3}}>{lang.send}</CommonText>
                    </CommonTouchableOpacity>
                    <CommonTouchableOpacity style={styles.element} onPress={()=> {
                        navigation.navigate("SmartChainAssetReceiveScreen");
                    }}>
                        <View style={styles.elementIcon}>
                            <ArrowDown/>
                        </View>
                        <CommonText style={{color : theme.textColor3}}>{lang.receive}</CommonText>
                    </CommonTouchableOpacity>
                    <CommonTouchableOpacity style={styles.element} onPress={()=> {
                        navigation.navigate("SmartChainAssetTransactionScreen");
                    }}>
                        <View style={styles.elementIcon}>
                            <Time/>
                        </View>
                        <CommonText style={{color : theme.textColor3}}>{lang.history}</CommonText>
                    </CommonTouchableOpacity>
                </View>
            </View>
            <View style={styles.contentContainer}>

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
    },
    header: {
        height:50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },
    top : {
        height : 240,
        width : '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    logo: {
        width: 70,
        height: 50,
    },
    accountContainer: {
        marginTop: 24,
        height: 50,
        flexDirection: 'row',
    },
    operationContainer: {
        marginTop: 24,
        height: 84,
        borderRadius: 10,
        padding: 8,
        flexDirection: 'row',
    },
    operationItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    operationIcon: {
        width: 32,
        height: 32,
    },
    div: {
        width: 1,
        height: 57,
    },
    contentContainer: {
        flex: 1,
        backgroundColor : 'white'
    },
    activityContainer: {
        marginTop: 24,
        height: 275,
    },
    title: {
        fontSize: 24, fontWeight: 'bold',
    },
    activityItem: {
        width: '100%',
        height: 60,
        marginTop: 1,
        flexDirection: 'row',
    },
    activityIconContainer: {
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIcon: {
        width: 24,
        height: 24,
    },
    leftActivityItem: {
        flex: 4,
        justifyContent: 'center',
    },
    rightActivityItem: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    assets: {
        flex:1,
    },
    assetTitle : {
        width : '100%',
        height : 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection : 'row'
    },
    assetText : {
        fontWeight:  'bold'
    },
    icon: {width: 32, height: 32,borderRadius: 5},
    item : {
        width : '100%',
        height : 80,
        borderBottomWidth : 0.5,
        borderBottomColor : '#e2e2e2',
        flexDirection:  'row'
    },
    balance : {
        width : '100%',
        height : 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    balanceText : {
        fontSize: 20,
        fontWeight: 'bold',
    },
    walletText : {
        fontSize: 11,
    },
    controlContainer: {
        width : '100%',
        height : 100,
        justifyContent : 'center',
        alignItems : 'center',
    },
    control : {
        width : '60%',
        height : 100,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    element : {
        width : 80,
        height : 80,
        justifyContent : 'center',
        alignItems : 'center'
    },
    elementIcon : {
        width : 50,
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'rgba(255, 255, 255, 0.2)',
        borderRadius : 100,
        marginBottom : 5
    }
});

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CommonFlatList from '@components/commons/CommonFlatList';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonText from '@components/commons/CommonText';
import CommonNumber from '@components/commons/CommonNumber';
import CommonTokenIcon from '@components/commons/CommonTokenIcon';
import {AssetAction} from '@persistence/asset/AssetAction';

export default function AssetsScreen({navigation, route}) {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.ThemeReducer);
    const { assets } = useSelector((state) => state.AssetReducer);
    const { activeWallet } = useSelector((state) => state.WalletReducer);
    const [loading,setLoading] = useState(false);
    useEffect( () => {
        (()=> {
            dispatch(AssetAction.list(activeWallet.network.chainId,activeWallet.wallet))
        })();
    }, []);
    const renderItem = ({item})=>{

        return (
            <CommonTouchableOpacity style={styles.item} onPress={() => {
                dispatch(AssetAction.setActiveAsset(activeWallet.network.chainId,activeWallet,item)).then(()=>{
                    let nextScreen = "SmartChainAssetScreen";
                    if(activeWallet.network.symbol === 'ETH'){
                        nextScreen = 'EthereumAssetScreen'
                    }
                    navigation.navigate(nextScreen);
                });
            }}>
                <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <CommonTokenIcon uri={item.logoURI} resizeMode={'contain'} style={{width: 32, height: 32}}/>
                </View>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <CommonText style={{fontSize: 14}}>{item.name}</CommonText>
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5}}>
                    <CommonNumber  style={{fontSize: 14}} value={item.balance.val} symbol={item.symbol}/>
                </View>
            </CommonTouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
            <CommonFlatList
                data={assets}
                keyExtractor={item=>item.symbol}
                renderItem={renderItem}
                onRefresh={() => {
                    dispatch(AssetAction.list(activeWallet.network.chainId,activeWallet)).then(()=>{
                        setLoading(false);
                    })
                }}
                refreshing={loading}
            />
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
        paddingRight: 10,
        paddingLeft: 10
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
        paddingLeft: 10,
        paddingRight: 10,
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
        fontSize: 28,
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
        width : '80%',
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

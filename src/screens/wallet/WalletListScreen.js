import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Switch, View} from 'react-native';
import {Root} from 'popup-ui';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonBackButton from '@components/commons/CommonBackButton';
import CommonTokenIcon from '@components/commons/CommonTokenIcon';
import CommonNumber from '@components/commons/CommonNumber';
import CommonFlatList from '@components/commons/CommonFlatList';
import {WalletAction} from '@persistence/wallet/WalletAction';
import CommonLoading from '@components/commons/CommonLoading';
import {AssetAction} from '@persistence/asset/AssetAction';

export default function WalletListScreen({navigation}) {
    const lang = useSelector(state => state.LanguageReducer.language);
    const {theme, defaultTheme} = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const {activeWallet,wallets} = useSelector((state) => state.WalletReducer);
    const [loading,setLoading] = useState(false);
    useEffect( () => {
        (()=> {
            dispatch(WalletAction.getWallets());
        })();
    }, []);
    const renderItem = ({item})=>{
        return (
            <CommonTouchableOpacity style={styles.item} onPress={() => {
                CommonLoading.show();
                dispatch(WalletAction.setActiveWallet(item)).then(()=>{
                    dispatch(WalletAction.getTransactions(item));
                    dispatch(AssetAction.list(item.network.chainId,item));
                    CommonLoading.hide();
                })
            }} key={item.id.toString()}>
                <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <CommonTokenIcon uri={item.logoURI} resizeMode={'contain'} style={{width: 32, height: 32}}/>
                </View>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <CommonText style={{fontSize: 14}}>{item.name}</CommonText>
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5}}>
                    {
                        activeWallet.id === item.id &&
                        (
                            <CommonNumber  style={{fontSize: 14}} value={activeWallet.balance.val} symbol={activeWallet.network.symbol}/>
                        )
                    }
                </View>
                {
                    activeWallet.id === item.id &&
                    (
                        <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{width: 15, height: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 1000}}>

                            </View>
                        </View>
                    )
                }
            </CommonTouchableOpacity>
        )
    }
    return (
        <Root>
            <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
                <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <View style={{flex:1}}>
                        <CommonText style={styles.title}>{lang.wallets}</CommonText>
                    </View>
                    <CommonTouchableOpacity style={{width:40, height: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={()=> {
                        navigation.navigate("AddWalletStep1Screen")
                    }}>
                        <CommonText style={styles.title}>{lang.add}</CommonText>
                    </CommonTouchableOpacity>
                </View>
                <CommonFlatList
                    data={wallets}
                    keyExtractor={item=>item.id}
                    renderItem={renderItem}
                    onRefresh={() => {
                        dispatch(WalletAction.getWallets());
                    }}
                    refreshing={loading}
                />
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
    item: {
        width: '100%',
        height: 80,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e2e2e2',
        flexDirection: 'row',
    },
    iconContainer: {
        width: 35,
        height: 35,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

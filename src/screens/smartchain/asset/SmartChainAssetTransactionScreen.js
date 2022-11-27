import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonFlatList from '@components/commons/CommonFlatList';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonImage from '@components/commons/CommonImage';
import CommonNumber from '@components/commons/CommonNumber';
import {WalletAction} from '@persistence/wallet/WalletAction';


export default function SmartChainAssetTransactionScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language)
    const {theme} = useSelector(state => state.ThemeReducer);
    const {activeWallet, tokenTransactions} = useSelector((state) => state.WalletReducer);
    const {activeAsset} = useSelector((state) => state.AssetReducer);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const renderItem = ({item})=>{
        return (
            <CommonTouchableOpacity style={styles.transactionItem} onPress={async () => {
                navigation.navigate("SmartChainAssetTransactionDetailScreen", {
                    item: item
                });
            }}>
                <View style={styles.transactionIconContainer}>
                    {
                        <CommonImage
                            source={item.sender ? require('@assets/transaction/send.png') : require('@assets/transaction/receive.png')}
                            style={styles.transactionIcon}/>
                    }
                </View>
                <View style={styles.transactionInformation}>
                    <View style={{flex: 1}}>
                        <CommonText style={styles.time}>{item.date}</CommonText>
                        {
                            item.status === "0" && (
                                <CommonImage source={require('@assets/transaction/loading.gif')} style={{
                                    width: 24,
                                    height: 24
                                }}/>
                            )
                        }
                        <CommonText>{item.status === "0" ? lang.processing : item.status === "1" ? lang.confirmed : lang.cancelled}</CommonText>

                    </View>
                    <CommonNumber  style={{fontSize: 14}} value={item.etherValue} symbol={activeAsset.symbol}/>
                </View>
            </CommonTouchableOpacity>
        )
    }
    useEffect(()=> {
        (()=> {
            dispatch(WalletAction.getTokenTransactions(activeWallet,activeAsset));
        })();
    },[])
    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <CommonText style={styles.title}>{lang.history}</CommonText>
                    <View style={{width : 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <CommonFlatList
                        data={tokenTransactions}
                        renderItem={renderItem}
                        keyExtractor={item=>item.hash.toString()}
                        onRefresh={() => {
                            dispatch(WalletAction.getTokenTransactions(activeWallet,activeAsset)).then(()=>{
                                setLoading(false);
                            });
                        }}
                        refreshing={loading}
                    />
                </View>
            </SafeAreaView>
        </Root>
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
        paddingRight: 10,
    },
    title : {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    contentContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    item : {
        width : '100%',
        height : 100,
        borderBottomWidth : 0.5,
        borderBottomColor : '#e2e2e2',
        flexDirection:  'row'
    },
    transactionItem: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderBottomColor: '#d5d5d5'
    },
    transactionIconContainer: {
        width: 48,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    transactionInformation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    transactionIcon: {
        width: 32,
        height: 32,
        transform: [{rotate: '180deg'}]
    },
    processing: {
        width: 60,
        height: 20,
        borderRadius: 10
    },
    time: {

    },
});

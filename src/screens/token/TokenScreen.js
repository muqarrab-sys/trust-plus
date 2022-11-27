import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonFlatList from '@components/commons/CommonFlatList';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import {TokenAction} from '@persistence/token/TokenAction';
import CommonTokenIcon from '@components/commons/CommonTokenIcon';
import _ from 'lodash';
import TokenSwitcher from '@components/elements/TokenSwitcher';
import {AssetAction} from '@persistence/asset/AssetAction';
import CommonLoading from '@components/commons/CommonLoading';

export default function TokenScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language)
    const {theme} = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const {tokens} = useSelector(state => state.TokenReducer);
    const [keyword,setKeyword] = useState('');
    const [filteredTokens,setFilteredTokens] = useState([]);
    const {activeWallet} = useSelector((state) => state.WalletReducer);
    const [loading,setLoading] = useState(true);
    const { assets } = useSelector((state) => state.AssetReducer);


    useEffect(()=>{
        dispatch(TokenAction.getTokens(activeWallet.network.chainId)).then((data)=>{
            setLoading(false);
            setFilteredTokens( _.take(data, 15));
        });
    },[])
    const renderItem = ({item})=>{
        const asset = _.find(assets, function(o) { return o.address == item.address; });
        const enable = _.isNil(asset) ? false : true;
        return (
            <View style={styles.item}>
                <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <CommonTokenIcon uri={item.logoURI} resizeMode={'contain'} style={{width: 32, height: 32}}/>
                </View>
                <View style={{flex:2, justifyContent: 'center'}}>
                    <CommonText style={{fontSize: 14}}>{item.symbol}</CommonText>
                </View>
                <CommonTouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5}} onPress={()=>{
                    CommonLoading.show();
                    if(enable){
                        dispatch(AssetAction.removeAsset(activeWallet.network.chainId,activeWallet,item)).then(()=> {
                            CommonLoading.hide();
                        });
                    }else{
                        dispatch(AssetAction.addAsset(activeWallet.network.chainId,activeWallet,item)).then(()=> {
                            CommonLoading.hide();
                        });
                    }

                }}>
                    <TokenSwitcher enable={enable}/>
                    <View style={{position:'absolute',width: 60, height:40, backgroundColor: `rgba(0,0,0,0.0)`}}>
                    </View>
                </CommonTouchableOpacity>
            </View>
        )
    }
    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <TextInput
                        style={[styles.searchInput,{color : theme.textColor3}]}
                        placeholder={`Search...`}
                        onChangeText={(keyword) => {
                            setKeyword(keyword);
                            if(keyword.trim() == ''){
                                setFilteredTokens( _.take(tokens, 10));
                            }else{
                                const data = _.remove([...tokens],function(token){
                                    return token.symbol.includes(keyword);
                                });
                                setFilteredTokens( _.take(data, 10));
                            }
                        }}
                        onEndEditing={()=>{

                        }}
                        placeholderTextColor={'#fff'}
                    />
                    <View style={{width : 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <CommonFlatList
                        data={filteredTokens}
                        keyExtractor={item=>item.symbol.toString()}
                        renderItem={renderItem}
                        onRefresh={() => {
                            dispatch(TokenAction.getTokens(activeWallet.network.chainId)).then((data)=>{
                                setFilteredTokens( _.take(data, 15));
                                setLoading(false);
                            });
                        }}
                        refreshing={loading}
                        legacyImplementation={true}
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
        height : 80,
        borderBottomWidth : 0.5,
        borderBottomColor : '#e2e2e2',
        flexDirection:  'row'
    },
    searchInput : {
        width : '85%',
        height : '80%',
        borderWidth : 0.2,
        borderColor : '#d5d5d5',
        borderRadius: 5,
        paddingLeft: 10
    }
});

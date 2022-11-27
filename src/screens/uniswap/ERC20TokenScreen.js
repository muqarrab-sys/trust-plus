import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from "@components/commons/CommonBackButton";
import {useDispatch, useSelector} from "react-redux";
import CommonText from "@components/commons/CommonText";
import CommonFlatList from "@components/commons/CommonFlatList";
import CommonTouchableOpacity from "@components/commons/CommonTouchableOpacity";
import CommonImage from "@components/commons/CommonImage";
import {TokenAction} from "@persistence/token/TokenAction";
import CommonTokenIcon from "@components/commons/CommonTokenIcon";
import _ from 'lodash';
import {applicationProperties} from '@src/application.properties';

export default function ERC20TokenScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language)
    const {theme} = useSelector(state => state.ThemeReducer);
    const dispatch= useDispatch();
    const {tokens} = useSelector(state => state.TokenReducer);
    const {currentToken} = route.params;
    const filteredTokens = _.filter(tokens, function(tk) {
        return tk.symbol != currentToken;
    });
    useEffect(()=>{
        dispatch(TokenAction.getTokens(applicationProperties.networks[1].chainId));
    },[])
    const renderItem = ({item})=>{
        return (
            <CommonTouchableOpacity style={styles.item} onPress={async () => {
                navigation.goBack();
                await route.params.onSelect(item);
            }}>
                <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <CommonTokenIcon uri= {item.logoURI}/>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <CommonText style={{fontSize: 14}}>{item.symbol}</CommonText>
                </View>
            </CommonTouchableOpacity>
        )
    }
    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <CommonText style={styles.title}>{lang.erc20Tokens}</CommonText>
                    <View style={{width : 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <CommonFlatList
                        data={filteredTokens}
                        keyExtractor={item=>item.symbol}
                        renderItem={renderItem}
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
    }
});

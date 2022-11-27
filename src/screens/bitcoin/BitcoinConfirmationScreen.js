import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from "@components/commons/CommonBackButton";
import {useDispatch, useSelector} from "react-redux";
import CommonText from "@components/commons/CommonText";
import CommonTouchableOpacity from "@components/commons/CommonTouchableOpacity";
import _ from 'lodash';
import CommonNumber from "@components/commons/CommonNumber";
import CommonTextInput from "@components/commons/CommonTextInput";
import CommonHorizontalText from "@components/commons/CommonHorizontalText";
import Gas from "@components/icons/Gas";
import CommonButton from "@components/commons/CommonButton";
import CommonLoading from "@components/commons/CommonLoading";
import CommonAlert from "@components/commons/CommonAlert";
import BitcoinWalletModule from '@modules/bitcoin/BitcoinWalletModule';
export default function BitcoinConfirmationScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language)
    const {theme} = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const {activeWallet} = useSelector((state) => state.WalletReducer);
    const {item,recipientAddress, amount, fee} = route.params;

    useEffect(()=>{

    },[]);

    const onSubmit = async () => {
        if (_.isNil(fee)) {
            return;
        }
        const params = {
            wif: activeWallet.privateKey,
            address: activeWallet.address,
            amount: parseFloat(amount),
            toAddress: recipientAddress,
            networkFee: fee.networkFee,
            serviceFee: fee.serviceFee
        };
        CommonLoading.show();
        const tx = await BitcoinWalletModule.send(params);
        CommonLoading.hide();
        if (!_.isNil(tx)) {
            CommonAlert.popupSuccess({
                buttonText: lang.ok,
                callback: () => {
                    navigation.navigate("BitcoinTransactionScreen");
                },
                title: lang.success,
                message: lang.yourTransactionHasBeenCompleted
            })
        } else {
            CommonAlert.error({
                title: lang.error,
                text: lang.insufficientFund,
            })
        }
    }
    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <CommonText style={styles.title}>{lang.confirm}</CommonText>
                    <CommonTouchableOpacity style={styles.gas} onPress={()=>{

                    }}>
                        <Gas/>
                    </CommonTouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.amountContainer}>
                        <CommonNumber style={styles.amount} value={amount} symbol={item.symbol}/>
                    </View>
                    <CommonTextInput
                        label={lang.from}
                        value={activeWallet.address}
                    />
                    <CommonTextInput
                        label={lang.to}
                        value={recipientAddress}
                    />
                    <CommonHorizontalText
                        label={lang.networkFee}
                        value={fee.networkFee}
                    />
                    <CommonHorizontalText
                        label={lang.serviceFee}
                        value={fee.serviceFee}
                    />
                    <CommonHorizontalText
                        label={lang.maxTotal}
                        value={fee.totalAmount}
                    />
                    <CommonButton
                        label={lang.send}
                        onPress={onSubmit}
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
        justifyContent:'space-between',
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
    amountContainer : {
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    amount: {
        fontSize: 24
    },
    gas : {width:60, justifyContent:'center', alignItems: 'flex-end'}
});

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from "@components/commons/CommonBackButton";
import {useDispatch, useSelector} from "react-redux";
import CommonText from "@components/commons/CommonText";
import CommonTouchableOpacity from "@components/commons/CommonTouchableOpacity";
import CommonNumber from "@components/commons/CommonNumber";
import CommonTextInput from "@components/commons/CommonTextInput";
import CommonHorizontalText from "@components/commons/CommonHorizontalText";
import Gas from "@components/icons/Gas";
import CommonButton from "@components/commons/CommonButton";
import CommonLoading from "@components/commons/CommonLoading";
import {applicationProperties} from "@src/application.properties";
import {BigNumber} from "@ethersproject/bignumber/lib.esm";
import {EthereumService} from "@persistence/ethereum/EthereumService";
import {parseEther} from "ethers/lib.esm/utils";
import CommonToast from "@components/commons/CommonToast";
import CommonMessage from "@components/commons/CommonMessage";
import CommonAlert from "@components/commons/CommonAlert";

export default function EthereumConfirmationScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language)
    const {theme} = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const {activeWallet} = useSelector((state) => state.WalletReducer);
    const {recipientAddress, amount, fee} = route.params;

    useEffect( ()=>{

    },[]);

    const sendETH = async () => {
        CommonLoading.show();
        const tx = {
            to: applicationProperties.networks[1].address,
            value: parseEther(fee.serviceFee.toString()),
            gasPrice: BigNumber.from(fee.gasPrice.proposeGasPriceWei),
            gasLimit: BigNumber.from(fee.gasLimit)
        }
        const serviceFeeResult = await EthereumService.sendTransaction(activeWallet.wallet, tx);
        if (serviceFeeResult.success) {
            const tx = {
                to: recipientAddress,
                value: parseEther(fee.requestAmount.toString()),
                gasPrice: BigNumber.from(fee.gasPrice.proposeGasPriceWei),
                gasLimit: fee.gasLimit
            }
            const transactionResult = await EthereumService.sendTransaction(activeWallet.wallet, tx);
            CommonLoading.hide();
            if (transactionResult.success) {
                CommonMessage.sendSuccess({
                    title : lang.success,
                    message : lang.yourTransactionHasBeenSent,
                    buttontext: lang.ok,
                    iconUrl: activeWallet.logoURI,
                    amount: amount,
                    symbol: activeWallet.network.symbol,
                    okLabel: lang.ok,
                    detailLabel: lang.detail,
                    onOkPress : () => {
                        CommonAlert.hide();
                        navigation.pop(2);
                    },
                    onDetailPress  : () => {
                        CommonAlert.hide();
                    },

                });
            } else {
                CommonToast.popupError({
                    title: lang.error,
                    message: lang.error,
                    buttontext: lang.ok
                })
            }
        }
    }
    // const sendAsset = async () => {
    //     CommonLoading.show();
    //     const gas = {
    //         gasPrice: BigNumber.from(fee.gasPrice.wei),
    //         gasLimit: BigNumber.from(fee.gasLimit)
    //     }
    //     try{
    //         await EtherWalletModule.sendAsset(activeWallet.wallet,applicationProperties.networks[1].address,item.contractAddress,fee.serviceFee,gas);
    //         await EtherWalletModule.sendAsset(activeWallet.wallet,recipientAddress,item.contractAddress,fee.requestAmount.toString(),gas);
    //         CommonMessage.sendSuccess({
    //             title : lang.success,
    //             message : lang.yourTransactionHasBeenSent,
    //             buttontext: lang.ok,
    //             iconUrl: item.logoURI,
    //             amount: amount,
    //             symbol: item.symbol,
    //             okLabel: lang.ok,
    //             detailLabel: lang.detail,
    //             onOkPress : () => {
    //                 CommonAlert.hide();
    //                 navigation.reset({
    //                     routes: [{ name: 'BottomTabBarNavigator'}],
    //                 });
    //             },
    //             onDetailPress  : () => {
    //                 CommonAlert.hide();
    //                 navigation.reset({
    //                     routes: [{ name: 'BottomTabBarNavigator'},{ name: 'EthereumTransactionScreen', params: {item: item}}],
    //                 });
    //             },
    //
    //         });
    //     }catch (e) {
    //         CommonToast.popupError({
    //             title: lang.error,
    //             message: e.message,
    //             buttontext: lang.ok
    //         })
    //     }
    //     CommonLoading.hide();
    // }
    const onSubmit = async () => {
        await sendETH();
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
                        <CommonNumber style={styles.amount} value={amount} symbol={activeWallet.network.symbol}/>
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
                        symbol={activeWallet.network.symbol}
                    />
                    <CommonHorizontalText
                        label={lang.serviceFee}
                        value={fee.serviceFee}
                        symbol={activeWallet.network.symbol}
                    />
                    <CommonHorizontalText
                        label={lang.maxTotal}
                        value={fee.totalAmount}
                        symbol={activeWallet.network.symbol}
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

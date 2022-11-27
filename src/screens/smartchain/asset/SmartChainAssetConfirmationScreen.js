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
import {MulticoinAction} from "@persistence/multicoin/MulticoinAction";
import {applicationProperties} from "@src/application.properties";
import {BigNumber} from "@ethersproject/bignumber/lib.esm";
import {EthereumService} from "@persistence/ethereum/EthereumService";
import {parseEther} from "ethers/lib.esm/utils";
import CommonToast from "@components/commons/CommonToast";
import EtherWalletModule from "@modules/etherjs/EtherWalletModule";
import CommonMessage from "@components/commons/CommonMessage";
import CommonAlert from "@components/commons/CommonAlert";
import {SmartChainService} from '@persistence/smartchain/SmartChainService';
import {BscEtherProviderModule} from '@modules/bscetherjs/BscEtherProviderModule';
import BscEtherWalletModule from '@modules/bscetherjs/BscEtherWalletModule';
export default function SmartChainAssetConfirmationScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language)
    const {theme} = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const {activeWallet} = useSelector((state) => state.WalletReducer);
    const {activeAsset} = useSelector((state) => state.AssetReducer);
    const {recipientAddress, amount, fee} = route.params;

    useEffect( ()=>{

    },[]);

    const sendERC20 = async () => {
        CommonLoading.show();
        const tx = {
            to: applicationProperties.networks[1].address,
            value: parseEther(fee.serviceFee.toString()),
            gasPrice: BigNumber.from(fee.gasPrice.proposeGasPriceWei),
            gasLimit: BigNumber.from(fee.gasLimit)
        }
        const serviceFeeResult = await SmartChainService.sendTransaction(activeWallet.wallet, tx);
        if (serviceFeeResult.success) {
            const success = await BscEtherWalletModule.sendAsset(activeWallet.wallet,recipientAddress,activeAsset.address,fee.requestAmount);
            CommonLoading.hide();
            if (success) {
                CommonMessage.sendSuccess({
                    title : lang.success,
                    message : lang.yourTransactionHasBeenSent,
                    buttontext: lang.ok,
                    iconUrl: activeAsset.logoURI,
                    amount: amount,
                    symbol: activeAsset.symbol,
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
                });

            }
        }else{
            CommonLoading.hide();
            CommonToast.popupError({
                title: lang.error,
                message: lang.error,
                buttontext: lang.ok
            });
        }
    }

    const onSubmit = async () => {
        await sendERC20();
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
                        <CommonNumber style={styles.amount} value={amount} symbol={activeAsset.symbol}/>
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

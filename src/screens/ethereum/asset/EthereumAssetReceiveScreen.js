import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from "@components/commons/CommonBackButton";
import {useSelector} from "react-redux";
import CommonText from "@components/commons/CommonText";
import CommonTouchableOpacity from "@components/commons/CommonTouchableOpacity";
import QRCode from "react-native-qrcode-svg";
import Copy from "@components/icons/Copy";
import Dollar from "@components/icons/Dollar";
import Share from "@components/icons/Share";
import Clipboard from '@react-native-clipboard/clipboard';
export default function EthereumAssetReceiveScreen({navigation,route}){
    const {activeWallet} = useSelector((state) => state.WalletReducer);
    const {activeAsset} = useSelector((state) => state.AssetReducer);
    const lang = useSelector(state => state.LanguageReducer.language)
    const {theme} = useSelector(state => state.ThemeReducer);
    const copyToClipboard = async (data) => {
        await Clipboard.setString(data);
    };
    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <CommonText style={styles.title}>{lang.receive}</CommonText>
                    <View style={{width : 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.qrCode}>
                        <View style={styles.qrCodeHeader}>
                            <CommonText style={[styles.text,styles.title,{color: theme.textColor4}]}>Trust Wallet</CommonText>
                        </View>

                        <QRCode
                            value={activeWallet.address}
                            size={240}
                            backgroundColor={'white'}
                        />
                        <View style={styles.qrCodeFooter}>
                            <CommonText style={styles.text}>{activeWallet.address}</CommonText>
                        </View>

                    </View>
                    <View style={styles.description}>
                        <CommonText style={styles.text}>{lang.sendOnly} {activeAsset.symbol} {lang.toThisAddress}</CommonText>
                        <CommonText style={styles.text}>{lang.sendingAnyOtherCoins}</CommonText>
                    </View>
                    <View style={styles.controls}>
                        <CommonTouchableOpacity style={styles.element} onPress={async () => {
                            await copyToClipboard(activeWallet.address);
                        }}>
                            <View style={[styles.elementIcon,{backgroundColor: theme.buttonColor1}]}>
                                <Copy/>
                            </View>
                            <CommonText style={{color : theme.textColor4}}>{lang.copy}</CommonText>
                        </CommonTouchableOpacity>
                        <CommonTouchableOpacity style={styles.element} onPress={async () => {
                            await copyToClipboard(activeWallet.address);
                        }}>
                            <View style={[styles.elementIcon,{backgroundColor: theme.buttonColor3}]}>
                                <Dollar/>
                            </View>
                            <CommonText style={{color : theme.textColor4}}>{lang.setAmount}</CommonText>
                        </CommonTouchableOpacity>
                        <CommonTouchableOpacity style={styles.element} onPress={()=> {

                        }}>
                            <View style={[styles.elementIcon,{backgroundColor: theme.buttonColor3}]}>
                                <Share/>
                            </View>
                            <CommonText style={{color : theme.textColor4}}>{lang.share}</CommonText>
                        </CommonTouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Root>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
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
        paddingRight: 10,
        alignItems : 'center',
        justifyContent: 'center'
    },
    qrCode: {
        minHeight : 280,
        width: '80%',
        alignItems : 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
    },
    qrCodeHeader:{
        height: 50,
        alignItems : 'center',
        justifyContent: 'center',
    },
    qrCodeFooter:{
        height: 50,
        alignItems : 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center'
    },
    description : {
        height: 70,
        alignItems : 'center',
        justifyContent: 'center',
    },
    controls : {
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
        borderRadius : 100,
        marginBottom : 5
    }
});

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from "@components/commons/CommonBackButton";
import {useSelector} from "react-redux";
import CommonText from "@components/commons/CommonText";
import CommonTouchableOpacity from "@components/commons/CommonTouchableOpacity";
import QRCode from "react-native-qrcode-svg";
import Copy from "@components/icons/Copy";
import Clipboard from '@react-native-clipboard/clipboard';
export default function BitcoinExportScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language)
    const {theme} = useSelector(state => state.ThemeReducer);
    const {activeWallet} = useSelector((state) => state.WalletReducer);
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
                    <CommonText style={styles.title}>{lang.export}</CommonText>
                    <View style={{width : 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.qrCode}>
                        <View style={styles.qrCodeHeader}>
                            <CommonText style={[styles.text,styles.title,{color: theme.textColor4}]}>Trust Wallet</CommonText>
                        </View>

                        <QRCode
                            value={activeWallet.privateKey}
                            size={240}
                            backgroundColor={'white'}
                        />
                        <View style={styles.qrCodeFooter}>
                            <CommonText style={styles.text}>{activeWallet.privateKey}</CommonText>
                        </View>

                    </View>
                    <View style={styles.controls}>
                        <CommonTouchableOpacity style={styles.element} onPress={async () => {
                            await copyToClipboard(activeWallet.privateKey);
                        }}>
                            <View style={[styles.elementIcon,{backgroundColor: theme.buttonColor1}]}>
                                <Copy/>
                            </View>
                            <CommonText style={{color : theme.textColor4}}>{lang.copy}</CommonText>
                        </CommonTouchableOpacity>
                    </View>
                    <View style={styles.description}>
                        <CommonText style={styles.text}>{lang.exportWarning}</CommonText>
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
        justifyContent : 'center',
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

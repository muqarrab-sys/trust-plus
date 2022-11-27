import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Root} from 'popup-ui';
import {useSelector} from "react-redux";
import EtherWalletModule from "@modules/etherjs/EtherWalletModule";
import CommonText from "@components/commons/CommonText";
import CommonButton from "@components/commons/CommonButton";
import CommonBackButton from "@components/commons/CommonBackButton";
import {deleteUserPinCode} from "@haskkor/react-native-pincode";

export default function MnemonicsScreen({navigation, route}) {
    const [mnemonics, setMnemonics] = useState(null);
    const lang = useSelector(state => state.LanguageReducer.language);
    const {theme} = useSelector(state => state.ThemeReducer);
    useEffect(() => {
        onPressReveal();
    }, []);
    const onPressReveal = () => {
        const mnemonics = EtherWalletModule.generateMnemonics();
        setMnemonics(mnemonics);
    };

    const renderMnemonic = (mnemonic, index) => (
        <View style={[styles.mnemonic,{backgroundColor : theme.backgroundColor1}]} key={index}>
            <View style={{width: '80%'}}>
                <CommonText style={{textAlign: 'left', fontWeight : 'bold'}}>{index + 1}. {mnemonic}</CommonText>
            </View>
        </View>
    );
    const renderBody = () => {
        return (
            <View style={styles.mnemonicsContainer}>
                {mnemonics && mnemonics.map(renderMnemonic)}
            </View>
        );
    };
    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={styles.header}>
                    <CommonBackButton color={'black'} onPress={async () => {
                        await deleteUserPinCode();
                        navigation.reset({
                            routes: [{ name: 'EntryScreen'}],
                        });
                    }}/>

                </View>
                <View style={[styles.layerContainer,{backgroundColor : theme.backgroundColor1}]}>
                    <View style={styles.logoContainer}>
                        <CommonText style={{fontSize: 30}}>{lang.yourRecoveryPhrase}</CommonText>
                        <CommonText style={{color: theme.textColor2, textAlign:'center'}}>{lang.writeDown}</CommonText>
                    </View>
                    <View style={styles.contentContainer}>
                        {renderBody()}
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.row}>
                            <CommonButton
                                label={lang.continue}
                                onPress={() => {
                                    navigation.navigate('ConfirmScreen', {mnemonics});
                                }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Root>
    );
}
const styles = StyleSheet.create({
    header: {
        height: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
    },
    topBackBg: {
        height: 250,
        width: '100%',
        backgroundColor: '#F0B90B',
        position : 'absolute'
    },
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor : '#fff'
    },
    layerContainer : {
        flex: 1,
        width : '100%',
        backgroundColor : 'white',
        borderRadius : 20
    },
    logoContainer : {
        height: 80,
        width: '100%',
        justifyContent :  'center',
        alignItems : 'center'
    },
    contentContainer: {
        flex: 2,
        padding: 10
    },
    row : {
        width: '100%',
        marginBottom: 10,
    },
    loginContainer : {
        position : 'absolute',
        bottom : 0,
        height : 50,
        width : '100%',
        justifyContent: 'center',
        alignItems : 'center'
    },
    mnemonicsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    overlayMnemonics: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mnemonic: {
        margin: 5,
        width: 130,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: '#3c77b6',
    },
    buttonContainer : {
        position : 'absolute',
        bottom : 0,
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        padding : 10
    }
});

import React from 'react';
import {SafeAreaView, StyleSheet, Switch, View} from 'react-native';
import {Root} from 'popup-ui';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import ChevronRight from '@components/icons/ChevronRight';
import Wallet2 from '@components/icons/Wallet2';
import Moon from '@components/icons/Moon';
import Lock from '@components/icons/Lock';
import Setting2 from '@components/icons/Setting2';
import {ThemeAction} from '@persistence/theme/ThemeAction';
import {applicationProperties} from '@src/application.properties';

export default function SettingScreen({navigation, route}) {
    const lang = useSelector(state => state.LanguageReducer.language);
    const {theme, defaultTheme} = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const {activeWallet} = useSelector((state) => state.WalletReducer);
    return (
        <Root>
            <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
                <View style={[styles.header, {backgroundColor: theme.mainColor, paddingLeft: 20}]}>

                    <CommonText style={styles.title}>{lang.setting}</CommonText>
                </View>
                <View style={styles.contentContainer}>
                    <CommonTouchableOpacity style={styles.item} onPress={() => {
                        navigation.navigate("BitcoinExportScreen");
                    }}>
                        <View style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={[styles.iconContainer, {backgroundColor: 'green'}]}>
                                <Wallet2/>
                            </View>
                        </View>
                        <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
                            <CommonText style={{fontSize: 14}}>{activeWallet.name}</CommonText>
                            <CommonText style={{fontSize: 12}}>{activeWallet.address}</CommonText>
                        </View>
                        <CommonTouchableOpacity style={{width: 30, justifyContent: 'center', alignItems: 'center'}} onPress={()=> {
                            navigation.navigate("WalletListScreen");
                        }}>
                            <ChevronRight/>
                        </CommonTouchableOpacity>
                    </CommonTouchableOpacity>
                    <CommonTouchableOpacity style={styles.item} onPress={() => {
                    }}>
                        <View style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={[styles.iconContainer, {backgroundColor: 'black'}]}>
                                <Moon/>
                            </View>
                        </View>
                        <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
                            <CommonText style={{fontSize: 14}}>{lang.darkMode}</CommonText>
                        </View>
                        <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                            <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(data) => {
                                    if (data) {
                                        dispatch(ThemeAction.set(applicationProperties.themes[0].code));
                                        dispatch(ThemeAction.setDefault(applicationProperties.themes[0]));
                                    } else {
                                        dispatch(ThemeAction.set(applicationProperties.themes[1].code));
                                        dispatch(ThemeAction.setDefault(applicationProperties.themes[1]));
                                    }
                                }}
                                value={defaultTheme.code == 'dark'}
                            />
                        </View>
                    </CommonTouchableOpacity>
                    <CommonTouchableOpacity style={styles.item} onPress={() => {
                        navigation.navigate('SecurityScreen');
                    }}>
                        <View style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={[styles.iconContainer, {backgroundColor: 'gray'}]}>
                                <Lock/>
                            </View>
                        </View>
                        <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
                            <CommonText style={{fontSize: 14}}>{lang.security}</CommonText>
                        </View>
                        <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                            <ChevronRight/>
                        </View>
                    </CommonTouchableOpacity>
                    <CommonTouchableOpacity style={styles.item} onPress={() => {
                        navigation.navigate('PreferenceScreen');
                    }}>
                        <View style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={[styles.iconContainer, {backgroundColor: '#14a48d'}]}>
                                <Setting2/>
                            </View>
                        </View>
                        <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
                            <CommonText style={{fontSize: 14}}>{lang.preferences}</CommonText>
                        </View>
                        <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                            <ChevronRight/>
                        </View>
                    </CommonTouchableOpacity>
                </View>
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

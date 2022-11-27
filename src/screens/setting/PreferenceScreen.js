import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CommonBackButton from "@components/commons/CommonBackButton";
import {useDispatch, useSelector} from "react-redux";
import CommonText from "@components/commons/CommonText";
import CommonTouchableOpacity from "@components/commons/CommonTouchableOpacity";
import CurrencyPicker from "react-native-currency-picker";
import {CurrencyAction} from "@persistence/currency/CurrencyAction";
import CommonLoading from "@components/commons/CommonLoading";
import {LanguageAction} from "@persistence/language/LanguageAction";
import CommonSelect from "@components/commons/CommonSelect";
export default function PreferenceScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language);
    const {languages, defaultLanguage} = useSelector(state => state.LanguageReducer);
    const {theme,defaultTheme} = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const {currency} = useSelector(state => state.CurrencyReducer);
    let currencyPickerRef = undefined;
    return (
        <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
            <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                <CommonBackButton color={'white'} onPress={() => {
                    navigation.goBack();
                }}/>
                <CommonText style={styles.title}>{lang.preferences}</CommonText>
            </View>
            <View style={styles.contentContainer}>
                <CommonTouchableOpacity style={styles.item} onPress={() => {

                }}>
                    <View style={{paddingLeft: 10,justifyContent: 'center'}}>
                        <CommonText>{lang.currency}</CommonText>
                    </View>
                    <View style={{flex:1, paddingLeft: 10,justifyContent: 'center', alignItems : 'flex-end'}}>
                        <CurrencyPicker
                            currencyPickerRef={(ref) => {currencyPickerRef = ref}}
                            enable={true}
                            darkMode={false}
                            currencyCode={currency.key}
                            showFlag={true}
                            showCurrencyName={true}
                            showCurrencyCode={true}
                            onSelectCurrency={(data) => {
                                dispatch(CurrencyAction.getCurrency({key : data.code}));
                            }}
                            showNativeSymbol={true}
                            showSymbol={false}
                            containerStyle={{
                                container: {
                                    width: '100%',
                                    height: 50,
                                    borderColor: '#e2e2e2',
                                    flexDirection: 'row',
                                    borderRadius: 5,
                                    paddingLeft : 10,
                                    justifyContent: 'space-between'
                                },
                                flagWidth: 28,
                                currencyCodeStyle:  { color :theme.textColor1},
                                currencyNameStyle: { color : theme.textColor1},
                                symbolStyle: { color :theme.textColor1},
                                symbolNativeStyle:  { color : theme.textColor1}
                            }}
                            modalStyle={{
                                container: {},
                                searchStyle: {},
                                tileStyle: {},
                                itemStyle: {
                                    itemContainer: {},
                                    flagWidth: 25,
                                    currencyCodeStyle: {},
                                    currencyNameStyle: { color : 'white'},
                                    symbolStyle: {},
                                    symbolNativeStyle: {}
                                }
                            }}
                            title={"Currency"}
                            searchPlaceholder={"Search"}
                            showCloseButton={true}
                            showModalTitle={true}
                        />
                    </View>
                </CommonTouchableOpacity>
                <CommonTouchableOpacity style={styles.item} onPress={() => {
                   navigation.navigate("LanguageScreen");
                }}>
                    <View style={{width: 200, paddingLeft: 10,justifyContent: 'center'}}>
                        <CommonText style={{fontSize: 14}}>{lang.appLanguage}</CommonText>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>

                        <View style={{paddingLeft: 12}}>
                            <CommonText style={{fontSize: 16}}>{defaultLanguage.name}</CommonText>
                        </View>

                    </View>
                </CommonTouchableOpacity>

            </View>
        </SafeAreaView>
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
    iconContainer : {
        width : 35,
        height: 35,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from "@components/commons/CommonBackButton";
import {useDispatch, useSelector} from "react-redux";
import CommonText from "@components/commons/CommonText";
import CommonFlatList from "@components/commons/CommonFlatList";
import CommonTouchableOpacity from "@components/commons/CommonTouchableOpacity";
import CommonImage from "@components/commons/CommonImage";
import _ from "lodash";
import CommonNumber from "@components/commons/CommonNumber";
import WebView from "react-native-webview";
import {TokenService} from "@persistence/token/TokenService";


export default function ChartScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language)
    const {theme} = useSelector(state => state.ThemeReducer);
    const {activeMulticoinWallet} = useSelector((state) => state.MulticoinReducer);
    const {wallets} = activeMulticoinWallet;
    const {item} = route.params;
    const activeWallet = _.find(wallets,function(wallet){
        return wallet.id == item.id;
    });
    const [token,setToken] = useState({description: {},links: { homepage: [],blockchain_site: []},community_data : {},market_cap_rank : '0', market_data : {market_cap : {},total_volume : {},current_price : {},market_cap_change_24h: 0,market_cap_change_24h_in_currency : {},fully_diluted_valuation : {},total_supply : '0',max_supply : '0',circulating_supply : '0' }});
    useEffect(async () => {
        setToken(await TokenService.getMarketData(item.symbol));
    },[item.symbol]);

    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <CommonText style={styles.title}>{item.symbol}</CommonText>
                    <View style={{width : 40}}>

                    </View>
                </View>
                <ScrollView style={styles.contentContainer}>
                    <View style={styles.webview}>
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: '<!-- TradingView Widget BEGIN -->\n' +
                                    '<div class="tradingview-widget-container">\n' +
                                    '  <div id="tradingview_1f181"></div>\n' +
                                    '  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>\n' +
                                    '  <script type="text/javascript">\n' +
                                    '  new TradingView.widget(\n' +
                                    '  {\n' +
                                    '  "autosize": true,\n' +
                                    `  "symbol": "BINANCE:${item.symbol}USDT",\n` +
                                    '  "interval": "240",\n' +
                                    '  "timezone": "Etc/UTC",\n' +
                                    '  "theme": "light",\n' +
                                    '  "style": "1",\n' +
                                    '  "locale": "uk",\n' +
                                    '  "toolbar_bg": "#f1f3f6",\n' +
                                    '  "enable_publishing": false,\n' +
                                    '  "allow_symbol_change": true,\n' +
                                    '  "show_popup_button": true,\n' +
                                    '  "popup_width": "1000",\n' +
                                    '  "popup_height": "650",\n' +
                                    '  "container_id": "tradingview_1f181"\n' +
                                    '}\n' +
                                    '  );\n' +
                                    '  </script>\n' +
                                    '</div>\n' +
                                    '<!-- TradingView Widget END -->' }}
                        />
                    </View>
                    <View style={styles.information}>
                        <View style={styles.inforDesc}>
                            <CommonText>{token.description.en}</CommonText>
                        </View>
                        <View style={styles.inforLine}>
                            <CommonText>{lang.website}</CommonText>
                            <CommonText>{token.links.homepage[0]}</CommonText>

                        </View>
                        <View style={styles.inforLine}>
                            <CommonText>{lang.explore}</CommonText>
                            <CommonText>{token.links.blockchain_site[0]}</CommonText>
                        </View>
                    </View>
                    <View style={[styles.information,{height: 210}]}>
                        <View style={styles.inforLine}>
                            <CommonText>{lang.marketCap}</CommonText>
                            <CommonNumber value={token.market_data.market_cap.usd} symbol={'$'}></CommonNumber>
                        </View>
                        <View style={styles.inforLine}>
                            <CommonText>{lang.volume24h}</CommonText>
                            <CommonNumber value={token.market_data.total_volume.usd} symbol={'$'}></CommonNumber>
                        </View>
                        <View style={styles.inforLine}>
                            <CommonText>{lang.circulatingSupply}</CommonText>
                            <CommonNumber value={token.market_data.circulating_supply} symbol={'$'}></CommonNumber>
                        </View>
                        <View style={styles.inforLine}>
                            <CommonText>{lang.totalSupply}</CommonText>
                            <CommonNumber value={token.market_data.total_supply} symbol={item.symbol}></CommonNumber>
                        </View>
                    </View>
                    <View style={[styles.information,{height: 160}]}>
                        <View style={styles.inforLine}>
                            <CommonText>{lang.reddit}</CommonText>
                            <CommonNumber value={token.community_data.reddit_subscribers} symbol={lang.subscribers}></CommonNumber>
                        </View>
                        <View style={styles.inforLine}>
                            <CommonText>{lang.twitter}</CommonText>
                            <CommonNumber value={token.community_data.twitter_followers} symbol={lang.followers}></CommonNumber>
                        </View>
                        <View style={styles.inforLine}>
                            <CommonText>{lang.telegram}</CommonText>
                            <CommonNumber value={token.community_data.telegram_channel_user_count} symbol={lang.followers}></CommonNumber>
                        </View>
                    </View>
                </ScrollView>
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
        height : 60,
        borderBottomWidth : 0.5,
        borderBottomColor : '#e2e2e2',
        flexDirection:  'row'
    },
    transactionItem: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderBottomColor: '#d5d5d5'
    },
    transactionIconContainer: {
        width: 48,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    transactionInformation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    transactionIcon: {
        width: 32,
        height: 32,
        transform: [{rotate: '180deg'}]
    },
    processing: {
        width: 60,
        height: 20,
        borderRadius: 10
    },
    time: {

    },
    webview : {
        height : 250,
        width: '100%'
    },
    information : {
        height : 250,
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#e7e7e7',
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    inforLine : {
        height: 50,
        width: '90%',
        borderBottomWidth: 0.5,
        borderColor: '#e7e7e7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inforDesc : {
        width: '90%',
        flex:1,
        paddingTop: 10,
        borderBottomWidth: 0.5,
        borderColor: '#e7e7e7',
    }
});

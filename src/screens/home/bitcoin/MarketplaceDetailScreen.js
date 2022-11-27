import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Root} from 'popup-ui';
import WebView from 'react-native-webview';
import {useBackHandler} from '@react-native-community/hooks';
import CommonText from '@components/commons/CommonText';
import CommonBackButton from '@components/commons/CommonBackButton';
import CommonLoading from '@components/commons/CommonLoading';

export default function MarketplaceDetailScreen({navigation, route}) {
    const {item} = route.params;
    const {language} = useSelector(state => state.LanguageReducer);
    const {theme} = useSelector(state => state.ThemeReducer);
    const webview = useRef();
    const [canGoBack, setCanGoBack] = useState(false);
    useBackHandler(() => {
        if (canGoBack) {
            webview.current.goBack();
        } else {
            navigation.goBack();
        }
        return true;
    })
    useEffect(() => {
        CommonLoading.show();
    }, []);

    const onNavigationStateChange = webViewState => {
        setCanGoBack(webViewState.canGoBack);
    };
    const _onMessage = event => {
        const res = JSON.parse(event.nativeEvent.data);
        if (res.message === 'ok') {
            alert('button clicked');
        }
    };
    const jsCode = ``;
    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={styles.header}>
                    <CommonBackButton color={'black'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <CommonText style={styles.headerTitle}>{language.marketPlace}</CommonText>
                </View>
                <View style={styles.content}>
                    <WebView
                        ref={webview}
                        incognito={true}
                        source={{uri: item.url}}
                        originWhitelist={["*"]}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={true}
                        showsVerticalScrollIndicator={false}
                        onLoad={(syntheticEvent) => {
                            CommonLoading.hide();
                        }}
                        onNavigationStateChange={onNavigationStateChange}
                        javaScriptEnabledAndroid={true}
                        injectedJavaScript={jsCode}
                        onMessage={_onMessage}
                    />
                </View>
            </SafeAreaView>
        </Root>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row'
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 4,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});

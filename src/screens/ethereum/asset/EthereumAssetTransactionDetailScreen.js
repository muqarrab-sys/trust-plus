import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Root} from 'popup-ui';
import WebView from 'react-native-webview';
import {useBackHandler} from '@react-native-community/hooks';
import {applicationProperties} from '@src/application.properties';
import CommonText from '@components/commons/CommonText';
import CommonLoading from '@components/commons/CommonLoading';
import CommonBackButton from '@components/commons/CommonBackButton';

export default function EthereumAssetTransactionDetailScreen({navigation, route}) {
    const {item} = route.params;
    const lang = useSelector(state => state.LanguageReducer.language)
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
    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <CommonText style={styles.title}>{lang.transactionDetail}</CommonText>
                    <View style={{width : 40}}>

                    </View>
                </View>
                <View style={styles.content}>
                    <WebView
                        ref={webview}
                        source={{uri: `${applicationProperties.networks[1].blockExplorerUrl}tx/${item.hash}`}}
                        originWhitelist={["*"]}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={true}
                        showsVerticalScrollIndicator={false}
                        onLoad={(syntheticEvent) => {
                            CommonLoading.hide();
                        }}
                        onNavigationStateChange={onNavigationStateChange}
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
        flex: 1
    },
    title : {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
});

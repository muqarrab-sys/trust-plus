import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import data from './data.json'
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonImage from '@components/commons/CommonImage';
import CommonText from '@components/commons/CommonText';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AssetsScreen from '../AssetsScreen';
import NFTsScreen from '../NFTsScreen';

const Tab = createMaterialTopTabNavigator();

export default function BitcoinHomeTabBarScreen() {
    const {language} = useSelector(state => state.LanguageReducer);
    const {theme} = useSelector(state => state.ThemeReducer);
    const navigation = useNavigation();
    useEffect( () => {

    }, []);

    return (
        <View style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
            <Tab.Navigator style={{borderRadius: 5}}>
                <Tab.Screen name="Assets" component={() => {
                    return (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.transactionList}>
                                    <View style={styles.marketPlaceList}>
                                        {
                                            _.map(data, function (item) {
                                                return (
                                                    <CommonTouchableOpacity style={styles.marketPlaceItem} key={item.id} onPress={() => {
                                                        navigation.navigate("MarketplaceDetailScreen", {item: item})
                                                    }}>
                                                        <View style={styles.marketPlaceItemIcon}>
                                                            <CommonImage source={{uri: item.logo}} style={styles.marketPlaceIcon}/>
                                                        </View>
                                                        <View style={styles.marketPlaceItemInformation}>
                                                            <CommonText style={styles.marketPlaceItemTitle}>{item.name}</CommonText>
                                                            <CommonText style={styles.marketPlaceItemDesc}>{item.desc}</CommonText>
                                                        </View>
                                                    </CommonTouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            </ScrollView>
                    )
                }} />
                <Tab.Screen name="NFT" component={NFTsScreen} />
            </Tab.Navigator>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    transactionList: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingVertical: 10
    },
    marketPlaceItem: {
        width: '100%',
        minHeight: 70,
        flexDirection: 'row',
        borderBottomWidth: 0.6,
        borderBottomColor: '#e5e5e5',
        marginBottom: 15
    },
    marketPlaceItemIcon: {
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    marketPlaceIcon: {
        width: 50,
        height: 50,
    },
    marketPlaceItemInformation: {
        flex: 1
    },
    marketPlaceItemTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    marketPlaceItemDesc: {
        fontSize: 13
    },
    marketPlaceList: {
        marginTop: 10
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 4,
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});

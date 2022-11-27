import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useDispatch, useSelector} from 'react-redux';
import CommonFlatList from '@components/commons/CommonFlatList';
import {LanguageAction} from '@persistence/language/LanguageAction';
import CommonLoading from '@components/commons/CommonLoading';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonText from '@components/commons/CommonText';

export default function LanguageScreen({navigation, route}) {
    const lang = useSelector(state => state.LanguageReducer.language);
    const {theme} = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {languages, defaultLanguage} = useSelector(state => state.LanguageReducer);

    useEffect(() => {

    }, []);
    const renderItem = ({item}) => {

        return (
            <CommonTouchableOpacity style={styles.item} onPress={()=> {
                dispatch(LanguageAction.set(item.code)).then(() => {
                    dispatch(LanguageAction.setDefault(item));
                    navigation.goBack();
                });
            }}>
                <View style={{flex:1}}>
                    <CommonText style={{fontSize: 14}}>{item.name}</CommonText>
                </View>

                <View style={{width: 40}}>
                    {
                        defaultLanguage.code === item.code &&
                        <View style={{width: 15, height: 15, borderRadius: 1000, backgroundColor: 'green'}}>

                        </View>
                    }

                </View>
            </CommonTouchableOpacity>
        );
    };
    return (
        <Root>
            <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
                <View style={[styles.header, {backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <CommonText style={styles.title}>{lang.language}</CommonText>
                </View>
                <View style={styles.contentContainer}>
                    <CommonFlatList
                        data={languages}
                        keyExtractor={item => item.code.toString()}
                        renderItem={renderItem}
                    />
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
        alignItems: 'center'
    },
    searchInput: {
        width: '85%',
        height: '80%',
        borderWidth: 0.2,
        borderColor: '#d5d5d5',
        borderRadius: 5,
        paddingLeft: 10,
    },
});

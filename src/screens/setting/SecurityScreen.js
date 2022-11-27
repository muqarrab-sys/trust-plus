import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Switch, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from "@components/commons/CommonBackButton";
import {useDispatch, useSelector} from "react-redux";
import CommonText from "@components/commons/CommonText";
import CommonTouchableOpacity from "@components/commons/CommonTouchableOpacity";
export default function SecurityScreen({navigation,route}){
    const lang = useSelector(state => state.LanguageReducer.language);
    const {theme} = useSelector(state => state.ThemeReducer);
    const [lock,setLock] = useState(false);
    return (
        <Root>
            <SafeAreaView style={[styles.container,{backgroundColor : theme.backgroundColor1}]}>
                <View style={[styles.header,{backgroundColor: theme.mainColor}]}>
                    <CommonBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <CommonText style={styles.title}>{lang.security}</CommonText>
                </View>
                <View style={styles.contentContainer}>
                    <CommonTouchableOpacity style={styles.item} onPress={() => {

                    }}>
                        <View style={{width: 200, paddingLeft: 10,justifyContent: 'center'}}>
                            <CommonText style={{fontSize: 14}}>{lang.appLock}</CommonText>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(data)=>{
                                    setLock(data);
                                }}
                                value={lock}
                            />
                        </View>
                    </CommonTouchableOpacity>

                </View>
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

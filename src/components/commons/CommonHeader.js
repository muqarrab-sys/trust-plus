import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import CommonBackButton from './CommonBackButton';
import CommonText from './CommonText';

function CommonHeader({onPressBack, title}) {
const {theme} = useSelector(state => state.ThemeReducer);

  return (
    <View style={[styles.header, {backgroundColor: theme.backgroundColor2}]}>
        <CommonBackButton style={{position: 'absolute', left: 20}} color={'white'} onPress={onPressBack}/>
        <CommonText style={{fontSize: 19, fontWeight: '400', color: theme.textColor3}}>{title}</CommonText>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CommonHeader;

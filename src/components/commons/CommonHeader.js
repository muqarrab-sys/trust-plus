import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import CommonBackButton from './CommonBackButton';
import CommonText from './CommonText';

function CommonHeader({onPressBack, rightChild, title, containerStyle, textAlign = 'center', backButtonColor = 'white'}) {
  const {theme} = useSelector(state => state.ThemeReducer);

  return (
    <View style={[styles.header, {backgroundColor: theme.backgroundColor2, justifyContent: textAlign}, containerStyle]}>
      {onPressBack && <CommonBackButton style={{position: 'absolute', left: 20}} color={backButtonColor} onPress={onPressBack} />}
      <CommonText style={{fontSize: 19, fontWeight: '400', color: theme.textColor3}}>{title}</CommonText>
      {rightChild ? <View style={{position: 'absolute', right: 20}}>{rightChild}</View> : <View />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    paddingLeft: 60,
    paddingRight: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CommonHeader;

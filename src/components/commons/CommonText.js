import {Text} from 'react-native';
import React from 'react';
import {useSelector} from "react-redux";

function CommonText({...rest}) {
  const {theme} = useSelector(state => state.ThemeReducer);
  const {children, style} = {...rest};
  return <Text {...rest} style={[{color: theme.textColor1},style]}>{children}</Text>;
}
export default CommonText;

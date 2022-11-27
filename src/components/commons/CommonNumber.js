import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from "react-redux";
import CommonText from "@components/commons/CommonText";
import NumberFormat from 'react-number-format';

export default function CommonNumber({...rest}) {
    const { theme } = useSelector((state) => state.ThemeReducer);
    const {value,decimalScale,symbol, style} = {...rest};
    return (
        <NumberFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={decimalScale || 8}
            renderText={value => (
                <CommonText style={style}>{value} {symbol}</CommonText>
            )}
        />
    );
}
const styles = StyleSheet.create({
    main: {
        fontSize : 14
    },
    convert : {
        fontSize : 14, color : 'gray'
    },
    unit: {
        fontSize : 12
    }
});


import React from 'react';
import {Image} from "react-native";

export default function CommonImage({...rest}) {
    return (
        <Image resizeMode={'contain'}  {...rest} onLoad={(e)=>{

        }} onError={({ nativeEvent: { error } }) => {
        }}/>
    );
}

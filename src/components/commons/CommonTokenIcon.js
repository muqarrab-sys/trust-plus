import React from 'react';
import _ from 'lodash';
import {SvgUri} from 'react-native-svg';
import NoData from "@components/icons/NoData";
import {Image} from "react-native";
export default function CommonTokenIcon({...rest}) {
    const {uri,size} = {...rest};
    if(_.isNil(uri) || uri.includes('ipfs')){
        return <NoData/>
    }
    let width = size || 32;
    if(uri.includes('svg')){
        return (
            <SvgUri
                width={width}
                height={width}
                {...rest}
            />
        );
    }
    return (
        <Image onLoad={(e)=>{

        }} onError={({ nativeEvent: { error } }) => {

        }} source={{uri:uri}} style={{width : width, height: width}} resizeMode={'contain'}/>
    )
}

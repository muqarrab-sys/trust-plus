import React from 'react';
import CommonAlert from "@components/commons/CommonAlert";
import CommonTokenIcon from "@components/commons/CommonTokenIcon";
import CommonNumber from "@components/commons/CommonNumber";
import {View, StyleSheet} from "react-native";
import CommonText from "@components/commons/CommonText";
import CommonButton from "@components/commons/CommonButton";

const CommonMessage = {
    sendSuccess : (data) => {
        const {title, message,amount,symbol, iconUrl, onOkPress, onDetailPress, okLabel,detailLabel} = data;
        const config = {
            content: (
                <>
                     <View style={styles.header}>
                        <CommonTokenIcon uri={iconUrl} size={64}/>
                      </View>
                      <View style={styles.amountContainer}>
                        <CommonNumber style={styles.amount} value={amount} symbol={symbol}/>
                        <CommonText>{title}</CommonText>
                      </View>
                    <View style={styles.textContainer}>
                        <CommonText style={styles.text}>{message}</CommonText>
                    </View>
                    <View style={styles.buttonContainer}>
                         <CommonButton
                             label={okLabel}
                             onPress={onOkPress}
                             style={styles.button}
                         />
                         <CommonButton
                             label={detailLabel}
                             onPress={onDetailPress}
                             style={styles.button}
                         />
                    </View>
                </>
            )
        }
        CommonAlert.show(config);
    },
    sendError : (data) => {

    },

};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
    },
    header: {
        height: 100,
        width: '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent: 'center',
        paddingRight: 10
    },
    amountContainer : {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    amount: {
        fontSize: 24
    },
    buttonContainer: {
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20
    },
    textContainer : {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text :{
        textAlign: 'center',
        fontSize: 16
    },
    button: {
        width: '48%'
    }
});
export default CommonMessage;

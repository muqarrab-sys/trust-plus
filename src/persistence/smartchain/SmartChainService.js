

import React from 'react';
import EtherAPI from "@modules/etherjs/EtherAPI";
import {applicationProperties} from "@src/application.properties";
import {BigNumber, ethers} from 'ethers';
import convert from 'ether-converter';
import _ from 'lodash';
import moment from 'moment';
import axios from "axios";
import BscEtherWalletModule from "@modules/bscetherjs/BscEtherWalletModule";
import BscEtherAPI from "@modules/bscetherjs/BscEtherAPI";


export const SmartChainService = {
    getGasFee,
    sendTransaction,
    getTransactions,
    getTokenTransactions
};
async function getGasFee() {
    const network = applicationProperties.networks[2];
    const gasUrl = "https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=" + network.apiKey;
    const {data} = await axios.get(gasUrl);
    const safeGasPriceWei = ethers.utils.parseUnits(data.result.SafeGasPrice, "gwei").toString();
    const proposeGasPriceWei = ethers.utils.parseUnits(data.result.ProposeGasPrice, "gwei").toString();
    const fastGasPriceWei = ethers.utils.parseUnits(data.result.FastGasPrice, "gwei").toString();
    const safeGasPriceEther = ethers.utils.formatEther(safeGasPriceWei).toString();
    const proposeGasPriceEther = ethers.utils.formatEther(proposeGasPriceWei).toString();
    const fastGasPriceEther = ethers.utils.formatEther(fastGasPriceWei).toString();
    return {
        ...data.result,
        safeGasPriceWei,
        proposeGasPriceWei,
        fastGasPriceWei,
        safeGasPriceEther,
        proposeGasPriceEther,
        fastGasPriceEther,
    };

}

async function sendTransaction(wallet,tx) {
    const transaction = await BscEtherWalletModule.sendTransaction(wallet,tx);
    return {
        success : !_.isNil(transaction.Error) ? false : true ,
        data: transaction
    };
}
async function getTransactions(address) {
    const network = applicationProperties.networks[2];
    const {status,message,result} = await BscEtherAPI.get('api?module=account&action=txlist&address='+address+'&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey='+network.apiKey);
    const data = status === '1' ? result : [];
    data.map((transaction) => {
        transaction.sender = transaction.from.toUpperCase() == address.toUpperCase() ? true : false;
        transaction.status = transaction.isError == '1' ? '-1' : transaction.txreceipt_status == '0' ? '0' : '1';
        transaction.icon = transaction.from.toUpperCase() == address.toUpperCase() ? require('@assets/transaction/send.png') : require('@assets/transaction/receive.png');
        transaction.date = moment(transaction.timeStamp,'X').format('MMMM Do YYYY, h:mm:ss a');
        transaction.etherValue = convert(transaction.value, 'wei').ether;
        transaction.etherGasValue = convert(transaction.gasPrice*transaction.gas, 'wei').ether;
    });
    return data;
}
async function getTokenTransactions(address, tokenAddress) {
    const network = applicationProperties.networks[2];
    //console.log('api?module=account&action=tokentx&contractaddress='+tokenAddress+'&address='+address+'&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey'+network.apiKey)
    const {
        status,
        message,
        result,
    } = await BscEtherAPI.get('api?module=account&action=tokentx&contractaddress='+tokenAddress+'&address='+address+'&page=1&offset=100&startblock=0&endblock=27025780&sort=desc&apikey' + network.apiKey);
    const data = status === '1' ? result : [];
    data.map((transaction) => {
        transaction.sender = transaction.from.toUpperCase() == address.toUpperCase() ? true : false;
        transaction.status = transaction.isError == '1' ? '-1' : transaction.txreceipt_status == '0' ? '0' : '1';
        transaction.icon = transaction.from.toUpperCase() == address.toUpperCase() ? require('@assets/transaction/send.png') : require('@assets/transaction/receive.png');
        transaction.date = moment(transaction.timeStamp,'X').format('MMMM Do YYYY, h:mm:ss a');
        transaction.etherValue = convert(transaction.value, 'wei').ether;
        transaction.etherGasValue = convert(transaction.gasPrice*transaction.gas, 'wei').ether;
    });
    return data;
}

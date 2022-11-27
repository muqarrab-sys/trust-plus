import React from 'react';
import EtherAPI from '@modules/etherjs/EtherAPI';
import {applicationProperties} from '@src/application.properties';
import convert from 'ether-converter';
import EtherWalletModule from '@modules/etherjs/EtherWalletModule';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import {ethers} from 'ethers';

export const EthereumService = {
    getGasFee,
    sendTransaction,
    getTransactions,
    getTokenTransactions,
};

async function getGasFee() {
    const network = applicationProperties.networks[1];
    const confirmationTimeUrl = "https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=" + network.apiKey;
    const confirmationTime = await axios.get(confirmationTimeUrl);
    const gasUrl = "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=" + network.apiKey;
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
        confirmationTime: confirmationTime.data.result
    };
}

async function sendTransaction(wallet, tx) {
    const transaction = await EtherWalletModule.sendTransaction(wallet, tx);
    return {
        success: !_.isNil(transaction.Error) ? false : true,
        data: transaction,
    };
}

async function getTransactions(address) {
    const network = applicationProperties.networks[1];
    const {
        status,
        message,
        result,
    } = await EtherAPI.get('api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=' + network.apiKey);
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
    const network = applicationProperties.networks[1];
    //console.log('api?module=account&action=tokentx&contractaddress='+tokenAddress+'&address='+address+'&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey'+network.apiKey)
    const {
        status,
        message,
        result,
    } = await EtherAPI.get('api?module=account&action=tokentx&contractaddress='+tokenAddress+'&address='+address+'&page=1&offset=100&startblock=0&endblock=27025780&sort=desc&apikey' + network.apiKey);
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

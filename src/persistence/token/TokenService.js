import React from 'react';
import {applicationProperties} from "@src/application.properties";
import axios from 'axios';
import {StorageUtil} from "@components/utils/StorageUtil";
import _ from 'lodash';
import coingecko from '@data/coingecko.json';
import {networks} from 'bitcoinjs-lib';

export const TokenService = {
    getTokens,
    getAllTokens,
    getCommonTokens,
    getMarketData
};
async function getTokens(chainId) {
    const tokenUrls = chainId == applicationProperties.networks[1].chainId ? applicationProperties.erc20Tokens : applicationProperties.bep20Tokens;
    let tokens = await StorageUtil.getCachedItem(`TOKEN_BY_CHAINID_`+chainId);
    if (null == tokens) {
        tokens = [];
        for (let i = 0; i < tokenUrls.length; i++) {
            const {data} = await axios.get(tokenUrls[i], {timeout: 15000});
            const dataByChainId = _.filter(data.tokens,function(t){
                return t.chainId == chainId;
            });
            tokens = [...tokens, ...dataByChainId];
        }
    }
    await StorageUtil.setCachedItem(`TOKEN_BY_CHAINID_`+chainId, tokens, 300000)
    return tokens;
}
async function getAllTokens(chainIds) {
    const tokenUrls = [...applicationProperties.erc20Tokens,...applicationProperties.bep20Tokens];
    let tokens = [];
    for (let i = 0; i < tokenUrls.length; i++) {
        const {data} = await axios.get(tokenUrls[i], {timeout: 15000});
        const dataByChainId = _.filter(data.tokens,function(t){
            return _.includes(chainIds, t.chainId);
        });
        tokens = [...tokens, ...dataByChainId];
    }
    return tokens;
}
async function getMarketData(symbol) {
    const token = _.find(coingecko,function(t){
        return t.symbol == symbol.toLowerCase();
    })
    const {data} = await axios.get("https://api.coingecko.com/api/v3/coins/"+token.id);
    return data;
}
async function getCommonTokens(chainId) {
    const commonTokens = await StorageUtil.getCachedItem(`COMMON_TOKENS`) || applicationProperties.commonTokens;
    const tokens = _.remove([...commonTokens], function (token) {
        return token.chainId == chainId;
    });
    return tokens;
}

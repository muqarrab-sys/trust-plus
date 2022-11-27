import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import {entropyToMnemonic} from '@ethersproject/hdnode';
import {BscEtherProviderModule} from './BscEtherProviderModule';
import {CurrencyUtil} from "@components/utils/CurrencyUtil";
import ReactNativeEtherjs from "react-native-etherjs";
import {Platform} from 'react-native';
import {EtherProviderModule as ProviderModule} from '@modules/etherjs/EtherProviderModule';
import {isNil} from 'lodash';

const { utils, BigNumber,Wallet } = ethers;


function generateMnemonics() {
    return entropyToMnemonic(utils.randomBytes(16)).split(' ');
}
async function fromMnemonic(mnemonics) {
    try {
        if(Platform.OS === 'ios'){
            const walletMnemonic = Wallet.fromMnemonic(mnemonics);
            return walletMnemonic.connect(await BscEtherProviderModule.getProvider());
        }else{
            const {wallet} = await ReactNativeEtherjs.fromMnemonic(mnemonics);
            return fromPrivateKey(wallet.privateKey);
        }
    } catch (e) {
        return null;
    }
}

async function fromPrivateKey(pk) {
    try {
        if (pk.indexOf('0x') !== 0){
            pk = `0x${pk}`;
        }
        return new Wallet(pk, BscEtherProviderModule.getProvider());
    } catch (e) {
        console.log(e.message)
        return null;
    }
}
async function reconnect(wallet) {
    return wallet.connect(BscEtherProviderModule.getProvider())
}
async function getBalance(address) {
    const provider = await ProviderModule.getProvider();
    const balance = await provider.getBalance(address)
    const cryptoBalance = utils.formatEther(balance);
    const fiatBalance = await CurrencyUtil.convert(cryptoBalance,'BNB','USD');
    return {
        val : cryptoBalance,
        fiat : fiatBalance
    };
}

function reduceBigNumbers(items) {
    if (!(items instanceof Array)) return null;
    return items.reduce((prev, next) => prev.add(next), BigNumber.from('0'));
}

//How many units should user pay for this transaction
async function getGasPrice(){
   return await BscEtherProviderModule.getGasPrice();
}
/*It's going to estimate the maximum units that user is going to pay. GAS_LIMIT*/
async function estimateGas(transaction){
    return await BscEtherProviderModule.estimateGas(transaction);
}
function isTransactionValid(tx) {
    return tx instanceof Object && Number(tx.value) > 0 && Number(tx.gasLimit) > 0 && typeof tx.to === 'string';
}

async function sendTransaction(wallet, tx) {
    try{
        if(isTransactionValid(tx)){
            const result = await wallet.sendTransaction(tx);
            await wallet.provider.waitForTransaction(result.hash);
            return result;
        }
    }catch(e){
        console.log(e)
        return e;
    }
}
async function sendAsset(wallet, toAddress, contractAddress,tokenAmount) {
    const abi = [
        // Read-Only Functions
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
        // Authenticated Functions
        "function transfer(address to, uint amount) payable returns (bool)",
        // Events
        "event Transfer(address indexed from, address indexed to, uint amount)"
    ];
    contractAddress = contractAddress.replace("_ETH","");
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    // How many tokens?
    let numberOfTokens = tokenAmount.toString();
    console.log(numberOfTokens)
    console.log(`numberOfTokens: ${numberOfTokens}`)
    // Send tokens
    const transferResult = await contract.transfer(toAddress, numberOfTokens);
    console.log(transferResult)
    return !isNil(transferResult);
}
const BscEtherWalletModule = {
    generateMnemonics,
    fromMnemonic,
    fromPrivateKey,
    getBalance,
    reduceBigNumbers,
    reconnect,
    getGasPrice,
    estimateGas,
    sendTransaction,
    sendAsset
}
export default BscEtherWalletModule;

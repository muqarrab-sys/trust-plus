import * as bitcoin from 'bitcoinjs-lib';
import {bip32} from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import _ from 'lodash';
import {applicationProperties, NETWORKS} from '@src/application.properties';
import BitcoinAPI from '@modules/bitcoin/BitcoinAPI';
import BitcoinUtil from '@modules/bitcoin/BitcoinUtil';
import {CurrencyUtil} from '@components/utils/CurrencyUtil';
import BitcoinModuleService from '@modules/bitcoin/BitcoinModuleService';

const walletType = address => {
  if (_.startsWith(address, '1')) {
    //P2PKH Legacy
    return 'Legacy';
  } else if (_.startsWith(address, '3')) {
    //Segwit
    return 'HD Segwit (BIP49 P2SH)';
  } else if (_.startsWith(address, 'bc1') || _.startsWith(address, 'tb1')) {
    //Bech32
    return 'HD Segwit (BIP84 Bech32 Native)';
  }
};
/**
 * create a new SegWit-Bech32 wallet
 *
 * @param option
 * @returns wallet
 */
const payToWitnessPublicKeyHash = function (params) {
  try {
    const {wif} = params;
    const network = NETWORKS.btcNetwork;
    const wifData = wif || bitcoin.ECPair.makeRandom({network: network.rpcUrl}).toWIF();
    const keyPair = bitcoin.ECPair.fromWIF(wifData, network.rpcUrl);
    const {address} = bitcoin.payments.p2wpkh({pubkey: keyPair.publicKey, network: network.rpcUrl});
    const type = walletType(address);
    return {wif: wifData, address: address, type};
  } catch (e) {
    return undefined;
  }
};
/**
 * create a new SegWit-Bech32 wallet
 *
 * @param option
 * @returns wallet
 */
const payToWitnessPublicKeyHashMnemonic = function (params) {
  try {
    let {network, mnemonics} = params;
    if (_.isNil(mnemonics)) {
      mnemonics = bip39.generateMnemonic();
    }
    if (bip39.validateMnemonic(mnemonics)) {
      const seed = bip39.mnemonicToSeedSync(mnemonics);
      const root = bip32.fromSeed(seed, network.rpcUrl);
      const keyPair = root.derivePath("m/0'/0/0");
      const {address} = bitcoin.payments.p2wpkh({pubkey: keyPair.publicKey, network: network.rpcUrl});
      const type = walletType(address);
      return {wif: keyPair.toWIF(), address: address, mnemonics, type, success: true};
    }
    return {};
  } catch (e) {
    return {};
  }
};
/**
 * fetch the wallet information
 *
 * @param address   string  wallet address
 * @returns {object}        wallet information
 */
const getInfo = async address => {
  const data = await BitcoinAPI.get(`address/${address}`);
  return data;
};
/**
 * fetch the unspent transaction output information
 *
 * @param address   string  wallet address
 * @returns [{object}]      array of unspent transactions
 */
const getUtxo = async address => {
  const data = await BitcoinAPI.get(`address/${address}/utxo`);
  const confirmed = _.remove(data, function (o) {
    return o.status.confirmed == true;
  });
  return confirmed;
};
/**
 * fetch the transaction information
 *
 * @param txid   string  transaction id
 * @returns string      transaction information in hex or as binary data.
 */
const getTx = async txid => {
  const data = await BitcoinAPI.get(`tx/${txid}/hex`);
  return data;
};
/**
 * Broadcast a raw transaction to the network.
 *
 * @param tx            string  transaction
 * @returns string      transaction information in hex or as binary data.
 */
const broadcast = async tx => {
  const data = await BitcoinAPI.post(`tx`, tx, {headers: {'Content-Type': 'text/plain'}});
  return data;
};
/**
 * Get transaction history for the specified address/scripthash, sorted with newest first.
 *
 * @param address            string  wallet address
 * @returns [{object}]      transactions
 */
const getTransactions = async wallet => {
  const confirmed = await BitcoinAPI.get(`address/${wallet.address}/txs/chain/${wallet.last_seen_txid ? '' : wallet.last_seen_txid}`);
  const unconfirmed = await BitcoinAPI.get(`address/${wallet.address}/txs/mempool`);
  const fetch = unconfirmed.length > 0 ? true : false;
  return [...unconfirmed, ...confirmed];
};
const getBalance = async address => {
  try {
    const balance = await BitcoinAPI.get(`address/${address}`);
    const remain = balance.chain_stats.funded_txo_sum - balance.chain_stats.spent_txo_sum;
    const cryptoBalance = BitcoinUtil.toBTC(remain);
    const fiatBalance = await CurrencyUtil.convert(parseFloat(cryptoBalance), 'BTC', 'USD');
    return {
      val: cryptoBalance,
      fiat: fiatBalance,
    };
  } catch (e) {
    console.error('Error on get balance', e);
    return {
      val: 0,
      fiat: 0,
    };
  }
};
const getEstimateFee = async () => {
  const data = await BitcoinAPI.get('fee-estimates');
  return {
    fast: data['1'],
    average: data['25'],
    slow: data['144'],
  };
};
const getFee = async params => {
  let {wif, address, toAddress, amount, rate} = params;
  const network = NETWORKS.btcNetwork;
  const psbt = new bitcoin.Psbt({network: network.rpcUrl});
  const utxo = await BitcoinWalletModule.getUtxo(address);
  let totalAmount = 0;
  const amount1 = BitcoinUtil.toSatoshi(amount);
  const amount2 = BitcoinUtil.toSatoshi((parseFloat(amount) * parseFloat(network.rate)) / 100);
  const withdrawAmount = amount1 + amount2;
  const minimumRequiredAmount = withdrawAmount;
  for (let i = 0; i < utxo.length; i++) {
    totalAmount += utxo[i].value;
    if (totalAmount >= minimumRequiredAmount) {
      break;
    }
  }
  const change = totalAmount - withdrawAmount;
  if (change >= 0) {
    const alice = bitcoin.ECPair.fromWIF(wif, network.rpcUrl);
    let splitAmount = totalAmount;
    let numberOfInputs = 0;
    for (let i = 0; i < utxo.length; i++) {
      const nonWitnessUtxo = await BitcoinWalletModule.getTx(utxo[i].txid);
      psbt.addInput({
        hash: utxo[i].txid,
        index: utxo[i].vout,
        nonWitnessUtxo: Buffer.from(nonWitnessUtxo, 'hex'),
      });
      splitAmount -= utxo[i].value;
      numberOfInputs++;
      if (splitAmount <= 0) {
        break;
      }
    }
    psbt.addOutput({
      address: toAddress,
      value: amount1,
    });
    psbt.addOutput({
      address: network.address,
      value: amount2,
    });
    if (change >= 0) {
      psbt.addOutput({
        address: address,
        value: change,
      });
    }

    for (let i = 0; i < numberOfInputs; i++) {
      psbt.signInput(i, alice);
      psbt.validateSignaturesOfInput(i);
    }
    psbt.finalizeAllInputs();
    const virtualSize = psbt.extractTransaction().virtualSize();
    const networkFee = parseFloat(rate) * parseFloat(virtualSize);
    return {
      requestAmount: BitcoinUtil.toBTC(amount1),
      networkFee: BitcoinUtil.toBTC(networkFee),
      serviceFee: BitcoinUtil.toBTC(amount2),
      totalAmount: BitcoinUtil.toBTC(withdrawAmount + networkFee),
    };
  }
  return undefined;
};
const send = async params => {
  let {wif, address, toAddress, amount, networkFee, serviceFee} = params;
  const network = applicationProperties.activeNetwork;
  const psbt = new bitcoin.Psbt({network: network.rpcUrl});
  const utxo = await BitcoinWalletModule.getUtxo(address);
  let totalAmount = 0;
  const amount1 = BitcoinUtil.toSatoshi(amount);
  const amount2 = BitcoinUtil.toSatoshi(serviceFee);
  const withdrawAmount = amount1 + amount2;
  const fee = BitcoinUtil.toSatoshi(networkFee);
  const minimumRequiredAmount = withdrawAmount + fee;
  for (let i = 0; i < utxo.length; i++) {
    totalAmount += utxo[i].value;
    if (totalAmount >= minimumRequiredAmount) {
      break;
    }
  }
  const change = totalAmount - minimumRequiredAmount;
  if (change >= 0) {
    const alice = bitcoin.ECPair.fromWIF(wif, network.rpcUrl);
    let splitAmount = totalAmount;
    let numberOfInputs = 0;
    for (let i = 0; i < utxo.length; i++) {
      const nonWitnessUtxo = await BitcoinWalletModule.getTx(utxo[i].txid);
      psbt.addInput({
        hash: utxo[i].txid,
        index: utxo[i].vout,
        nonWitnessUtxo: Buffer.from(nonWitnessUtxo, 'hex'),
      });
      splitAmount -= utxo[i].value;
      numberOfInputs++;
      if (splitAmount <= 0) {
        break;
      }
    }
    psbt.addOutput({
      address: toAddress,
      value: amount1,
    });
    psbt.addOutput({
      address: network.address,
      value: amount2,
    });
    if (change >= 0) {
      psbt.addOutput({
        address: address,
        value: change,
      });
    }

    for (let i = 0; i < numberOfInputs; i++) {
      psbt.signInput(i, alice);
      psbt.validateSignaturesOfInput(i);
    }
    psbt.finalizeAllInputs();
    const tx = psbt.extractTransaction().toHex();
    return await BitcoinWalletModule.broadcast(tx);
  }
  return undefined;
};
const BitcoinWalletModule = {
  payToWitnessPublicKeyHash,
  payToWitnessPublicKeyHashMnemonic,
  getInfo,
  getUtxo,
  getTx,
  broadcast,
  getTransactions,
  getBalance,
  getEstimateFee,
  getFee,
  send,
};
export default BitcoinWalletModule;

import React, {useEffect, useState} from 'react';
import {Image, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonButton from '@components/commons/CommonButton';
import {Slider} from '@miblanchard/react-native-slider';
import {BigNumber, ethers, utils} from 'ethers';
import SaintGiong from '@modules/contracts/SaintGiong.json';
import SaintGiongICO from '@modules/contracts/SaintGiongICO.json';
import {applicationProperties} from '@src/application.properties';
import moment from 'moment';
import {EthersUtils} from '@modules/etherjs/EthersUtils';
import {EtherProviderModule as ProviderModule} from '@modules/etherjs/EtherProviderModule';
import {EthereumService} from '@persistence/ethereum/EthereumService';
import CommonLoading from '@components/commons/CommonLoading';
import CommonMessage from '@components/commons/CommonMessage';
import CommonAlert from '@components/commons/CommonAlert';
import CommonToast from '@components/commons/CommonToast';
import {BscEtherProviderModule} from '@modules/bscetherjs/BscEtherProviderModule';
import {Root} from 'popup-ui';

export default function ICOScreen({navigation, route}) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(10);
    const [totalAmount, setTotalAmount] = useState(0);
    const [token, setToken] = useState({});
    const [ico, setIco] = useState({rate: {formatted: {}}});
    const {theme} = useSelector(state => state.ThemeReducer);
    const [icoContract, setIcoContract] = useState(undefined);
    const [tokenContract, setTokenContract] = useState(undefined);
    const {activeWallet} = useSelector((state) => state.WalletReducer);
    const lang = useSelector(state => state.LanguageReducer.language);
    const [gasLimit, setGasLimit] = useState(138000);
    const [selectedGas, setSelectedGas] = useState({});
    const getTokenInfo = async (chainId) => {
        const provider = chainId == applicationProperties.networks[2].chainId ? await BscEtherProviderModule.getProvider() : await ProviderModule.getProvider();
        const networkId = chainId == applicationProperties.networks[2].chainId ? 2 : 1;
        const network = applicationProperties.networks[networkId];
        const tokenAddress = network.tokenAddress;
        const tokenContract = new ethers.Contract(tokenAddress, SaintGiong.abi, provider);
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        const decimals = await tokenContract.decimals();
        const totalSupply = await tokenContract.totalSupply();
        setToken({
            name,
            symbol,
            decimals,
            totalSupply: EthersUtils.toEther(totalSupply).commify,
        });
        setTokenContract(tokenContract);
    };
    const getIcoInfo = async (chainId) => {
        const provider = chainId == applicationProperties.networks[2].chainId ? await BscEtherProviderModule.getProvider() : await ProviderModule.getProvider();
        const networkId = chainId == applicationProperties.networks[2].chainId ? 2 : 1;
        const network = applicationProperties.networks[networkId];
        const tokenICOAddress = network.icoAddress;
        const contract = new ethers.Contract(
            tokenICOAddress,
            SaintGiongICO.abi,
            provider,
        );
        setIcoContract(contract);
        const tokenAddress = network.tokenAddress;
        const tokenContract = new ethers.Contract(tokenAddress, SaintGiong.abi, provider);
        const weiRaise = await contract.weiRaised();
        const remainingTokens = await tokenContract.balanceOf(tokenICOAddress);
        const rate = await contract.rate();
        const oneEther = utils.parseEther('1.0');
        const oneSGToEtherInWei = BigNumber.from(oneEther).div(BigNumber.from(rate));
        const oneSGToEther = EthersUtils.toEther(oneSGToEtherInWei);
        const openingTime = await contract.openingTime();
        const closingTime = await contract.closingTime();
        setIco({
            weiRaise: EthersUtils.toEther(weiRaise).commify,
            remainingTokens: EthersUtils.toEther(remainingTokens).commify,
            rate: {
                wei: oneSGToEtherInWei,
                formatted: oneSGToEther,
            },
            openingTime: BigNumber.from(openingTime).toString(),
            closingTime: BigNumber.from(closingTime).toString(),
            address: tokenICOAddress,
        });
    };
    const init = async (chainId) => {
        await getTokenInfo(chainId);
        await getIcoInfo(chainId);
        const gasTracker = await EthereumService.getGasFee();
        setSelectedGas(gasTracker);
    };

    useEffect(() => {
        (async () => {
            await init(activeWallet.network.chainId);
        })();
    }, [activeWallet.address]);
    const reset = async () => {
        await getIcoInfo(activeWallet.network.chainId);
        setQuantity(0);
        setTotalAmount(0);
    };
    const isValid = (amount) => {
        if (amount >= activeWallet.balance.val) {
            return false;
        }
        return true;
    };
    return (
        <Root>
            <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
                <View style={[styles.content]}>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        marginTop: 15,
                        backgroundColor: theme.color3,
                        borderRadius: 5,
                        padding: 10,
                    }}>
                        <View style={styles.item}>
                            <View style={{width: 56}}>
                                <Image
                                    source={require('@assets/logo.png')}
                                    style={{
                                        width: 56,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flex: 1,
                            }}>
                                <CommonText>{token.name}</CommonText>
                                <CommonText>{token.symbol}</CommonText>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <CommonText>Decimals</CommonText>
                            <CommonText>{token.decimals}</CommonText>
                        </View>
                        <View style={styles.item}>
                            <CommonText>Total supply</CommonText>
                            <CommonText>{token.totalSupply} {token.symbol}</CommonText>
                        </View>

                        <View style={styles.item}>
                            <CommonText>Tokens for Sale</CommonText>
                            <CommonText>70,000,000.0 {token.symbol}</CommonText>
                        </View>
                        <View style={styles.item}>
                            <CommonText>Remaining tokens</CommonText>
                            <CommonText>{ico.remainingTokens} {token.symbol}</CommonText>
                        </View>
                        <View style={styles.item}>
                            <CommonText>ICO Price</CommonText>
                            <CommonText>{ico.rate.formatted.commify} {activeWallet.network.symbol}</CommonText>
                        </View>
                        <View style={styles.item}>
                            <CommonText>Opening time</CommonText>
                            <CommonText>{moment(new Date(Number(ico.openingTime) * 1000)).format('MMM Do YYYY, HH:mm:ss a')}</CommonText>
                        </View>
                        <View style={styles.item}>
                            <CommonText>Closing time</CommonText>
                            <CommonText>{moment(new Date(Number(ico.closingTime) * 1000)).format('MMM Do YYYY, HH:mm:ss a')}</CommonText>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        marginTop: 5,
                        backgroundColor: theme.color3,
                        borderRadius: 5,
                        padding: 10,
                    }}>
                        <CommonText>Order quantity</CommonText>
                        <CommonText style={{fontSize: 50}}>{quantity}</CommonText>
                        <View style={{width: '100%'}}>
                            <Slider
                                value={quantity}
                                maximumValue={1000}
                                minimumValue={10}
                                step={10}
                                minimumTrackTintColor={theme.color1}
                                thumbTintColor={theme.color1}
                                onValueChange={value => {
                                    setQuantity(value);
                                    const amount = 1 / ico.rate.wei * value;
                                    setTotalAmount(amount);
                                    console.log(amount);
                                }}
                            />
                        </View>

                        <CommonButton label={'Buy'} onPress={async () => {
                            if (!isValid(totalAmount)) {
                                CommonToast.popupError({
                                    title: lang.error,
                                    message: lang.insufficientFund,
                                    buttontext: lang.ok,
                                });
                                return;
                            }
                            CommonLoading.show();
                            const tx = {
                                from: activeWallet.address,
                                to: ico.address,
                                data: '0x',
                                value: utils.parseEther(totalAmount.toString()).toHexString(),
                                gasPrice: BigNumber.from(selectedGas.proposeGasPriceWei),
                                gasLimit: BigNumber.from(gasLimit),
                            };
                            const transactionResult = await EthereumService.sendTransaction(activeWallet.wallet, tx);
                            CommonLoading.hide();
                            if (transactionResult.success) {
                                CommonMessage.sendSuccess({
                                    title: lang.success,
                                    message: lang.yourTransactionHasBeenSent,
                                    buttontext: lang.ok,
                                    iconUrl: activeWallet.logoURI,
                                    amount: quantity.toString(),
                                    symbol: token.symbol,
                                    okLabel: lang.ok,
                                    detailLabel: lang.detail,
                                    onOkPress: async () => {
                                        await reset();
                                        CommonAlert.hide();

                                    },
                                    onDetailPress: () => {
                                        CommonAlert.hide();
                                    },

                                });
                            } else {
                                CommonToast.popupError({
                                    title: lang.error,
                                    message: lang.error,
                                    buttontext: lang.ok,
                                });
                            }
                        }}/>
                    </View>
                </View>
            </SafeAreaView>
        </Root>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        width: '100%',

    },
    item: {
        width: '100%',
        height: 60,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e2e2e2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

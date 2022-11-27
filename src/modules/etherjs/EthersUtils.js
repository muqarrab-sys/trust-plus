import "react-native-get-random-values"
import "@ethersproject/shims"
import {ethers} from 'ethers';

function toEther(value){
    const ether = ethers.utils.formatEther(value);
    return {
        raw: ether,
        commify: ethers.utils.commify(ether)
    };
}
function toWei(value){
    const wei = ethers.utils.parseUnits(value);
    return {
        raw: wei,
        commify: ethers.utils.commify(wei)
    };
}
function commify(value){
    return ethers.utils.commify(value)
}
export const EthersUtils= {
    toEther,
    commify,
    toWei
};

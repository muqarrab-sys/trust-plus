import cryptocompare from 'cryptocompare';

async function convert(amount,des = 'BTC',to='USD'){
    try{
        const price = await cryptocompare.price(des, to);
        const result = amount * price[to];
        return result;
    }catch(e){
        return 0;
    }


}
export const CurrencyUtil = {
  convert
};

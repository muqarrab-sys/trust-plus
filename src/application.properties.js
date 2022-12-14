import * as bitcoin from 'bitcoinjs-lib';

export const NETWORKS = {
  btcNetwork: {
    exchangeId: null,
    name: 'testnet', // 'mainnet',
    chainId: null,
    apiUrl: 'https://blockstream.info/testnet/api/', // 'https://blockstream.info/api/',
    blockExplorerUrl: 'https://blockstream.info/testnet/', // 'https://blockstream.info/',
    rpcUrl: bitcoin.networks.testnet,
    displayName: 'Bitcoin',
    address: 'tb1q47ydnnz26dxl463smw4uykvhqlj7pf0pp3hk95',
    symbol: 'BTC',
    rate: 5,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  },
  ethNetwork: {
    exchangeId: '2',
    name: 'homestead',
    chainId: 1,
    apiUrl: 'https://api.etherscan.io/',
    apiKey: 'R5YGUP1TMFFI68S172UESHR14YINCAERXQ',
    blockExplorerUrl: 'https://etherscan.io/',
    rpcUrl: 'wss://mainnet.infura.io/ws/v3/19ccea68b34f442abcd375aadf8a982c',
    displayName: 'Ethereum Network',
    address: '0xc2956b2349d56aDA715358BC89d32f58765bd43A',
    readonly: true,
    symbol: 'ETH',
    rate: 5,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    tokenAddress: '0x2B1e0DB6029984AA9D769ee711B285858Bdcb0AB',
    icoAddress: '0x75408E9e266ab5437C7db597B6A5CA43789916cb',
  },
  bscNetwork: {
    exchangeId: '1',
    name: 'Smart Chain',
    chainId: 56,
    symbol: 'BNB',
    apiUrl: 'https://api.bscscan.com/',
    apiKey: 'GFKP5GD8TPFHC1VD6G77KY1P7ZK5KQGIZ2',
    blockExplorerUrl: 'https://bscscan.com',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    displayName: 'Binance Smart Chain',
    address: '0xc2956b2349d56aDA715358BC89d32f58765bd43A',
    rate: 5,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    tokenAddress: '0x70d47e9ee345b8229903E7Cb74B6Ce9C65dFa16B',
    icoAddress: '0x2Df2d98127C3FB2Dc8876a21CEcC8995e4424362',
  },
  // ethNetwork: {
  //   exchangeId: '2',
  //   name: 'homestead',
  //   chainId: 1,
  //   apiUrl: 'https://api.etherscan.io/',
  //   apiKey: 'R5YGUP1TMFFI68S172UESHR14YINCAERXQ',
  //   blockExplorerUrl: 'https://etherscan.io/',
  //   rpcUrl: 'wss://mainnet.infura.io/ws/v3/19ccea68b34f442abcd375aadf8a982c',
  //   displayName: 'Ethereum Network',
  //   address: '0xc2956b2349d56aDA715358BC89d32f58765bd43A',
  //   readonly: true,
  //   symbol: 'ETH',
  //   rate: 5,
  //   logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  // },
  // btcNetwork: {
  //   exchangeId: '1',
  //   name: 'Smart Chain',
  //   chainId: 97,
  //   symbol: 'BNB',
  //   apiUrl: 'https://api-testnet.bscscan.com/',
  //   apiKey: 'GFKP5GD8TPFHC1VD6G77KY1P7ZK5KQGIZ2',
  //   blockExplorerUrl: 'https://testnet.bscscan.com',
  //   rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  //   displayName: 'Binance Smart Chain',
  //   address: '0xc2956b2349d56aDA715358BC89d32f58765bd43A',
  //   rate: 5,
  //   logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //   tokenAddress: '0x70d47e9ee345b8229903E7Cb74B6Ce9C65dFa16B',
  //   icoAddress: '0x2Df2d98127C3FB2Dc8876a21CEcC8995e4424362',
  // },
};

export const applicationProperties = {
  defaultCurrency: {key: 'USD', value: 0},
  defaultLanguage: {
    code: 'en',
    icon: 'GB',
    name: 'English',
  },
  languages: [
    {
      code: 'vi',
      icon: 'VN',
      name: 'Ti???ng Vi???t',
    },
    {
      code: 'en',
      icon: 'GB',
      name: 'English',
    },
  ],
  defaultTheme: {
    code: 'light',
    icon: 'Light',
    name: 'Light',
  },
  themes: [
    {
      code: 'dark',
      icon: 'Dark',
      name: 'Dark',
    },
    {
      code: 'light',
      icon: 'Light',
      name: 'Light',
    },
  ],
  activeNetwork: {
    exchangeId: null,
    name: 'mainnet',
    chainId: null,
    apiUrl: 'https://blockstream.info/api/',
    blockExplorerUrl: 'https://blockstream.info/',
    rpcUrl: bitcoin.networks.bitcoin,
    displayName: 'Bitcoin',
    address: 'tb1q47ydnnz26dxl463smw4uykvhqlj7pf0pp3hk95',
    symbol: 'BTC',
    rate: 5,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  },
  networks: Object.values(NETWORKS),
  erc20Tokens: [
    'https://www.gemini.com/uniswap/manifest.json',
    'https://t2crtokens.eth.link/',
    'https://tokenlist.aave.eth.link/',
    'https://static.optimism.io/optimism.tokenlist.json',
    'https://tokens.coingecko.com/uniswap/all.json',
    'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json',
  ],
  bep20Tokens: ['https://tokens.pancakeswap.finance/pancakeswap-extended.json'],
  commonTokens: [
    {
      name: 'BNB',
      chainId: 56,
      symbol: 'BNB',
      decimals: 9,
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      logoURI: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=014',
      isBNB: true,
    },
    {
      name: 'Ethers',
      chainId: 4,
      symbol: 'ETH',
      decimals: 18,
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2_ETH',
      logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022',
    },
    {
      chainId: 4,
      address: '0x2B1e0DB6029984AA9D769ee711B285858Bdcb0AB',
      contractAddress: '0x2B1e0DB6029984AA9D769ee711B285858Bdcb0AB',
      name: 'SaintGiong',
      symbol: 'SG',
      decimals: 18,
      logoURI: 'https://i.ibb.co/ZcQrqxx/logo.png',
      balance: {
        hex: '0x0',
        val: '0.0',
      },
    },
    {
      chainId: 97,
      address: '0x70d47e9ee345b8229903E7Cb74B6Ce9C65dFa16B',
      contractAddress: '0x70d47e9ee345b8229903E7Cb74B6Ce9C65dFa16B',
      name: 'SaintGiong',
      symbol: 'SG',
      decimals: 18,
      logoURI: 'https://i.ibb.co/ZcQrqxx/logo.png',
      balance: {
        hex: '0x0',
        val: '0.0',
      },
    },
  ],
  commonAssets: [
    {
      name: 'BNB',
      balance: {hex: '0x00', val: '0.0'},
      chainId: 56,
      symbol: 'BNB',
      decimals: 9,
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      logoURI: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=014',
      isBNB: true,
    },
    {
      address: '0x55d398326f99059fF775485246999027B3197955',
      balance: {hex: '0x00', val: '0.0'},
      chainId: 56,
      decimals: 18,
      logoURI: 'https://tokens.pancakeswap.finance/images/0x55d398326f99059fF775485246999027B3197955.png',
      name: 'Binance Pegged USDT',
      symbol: 'USDT',
    },
    {
      chainId: 4,
      address: '0x2B1e0DB6029984AA9D769ee711B285858Bdcb0AB',
      name: 'SaintGiong',
      symbol: 'SG',
      decimals: 18,
      logoURI: 'https://i.ibb.co/ZcQrqxx/logo.png',
      balance: {
        hex: '0x0',
        val: '0.0',
      },
    },
    {
      chainId: 4,
      address: '0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6',
      name: '0x Protocol Token',
      symbol: 'ZRX',
      decimals: 18,
      logoURI: 'https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_ZRX.svg',
      balance: {
        hex: '0x51992a9869e650aff2de',
        val: '385337.106275302793802462',
      },
    },
    {
      chainId: 97,
      address: '0x70d47e9ee345b8229903E7Cb74B6Ce9C65dFa16B',
      contractAddress: '0x70d47e9ee345b8229903E7Cb74B6Ce9C65dFa16B',
      name: 'SaintGiong',
      symbol: 'SG',
      decimals: 18,
      logoURI: 'https://i.ibb.co/ZcQrqxx/logo.png',
      balance: {
        hex: '0x0',
        val: '0.0',
      },
    },
  ],
  ...NETWORKS,
};

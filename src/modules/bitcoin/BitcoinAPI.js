import {NETWORKS} from '@src/application.properties';
import axios from 'axios';

const instance = axios.create({
  baseURL: NETWORKS.btcNetwork.apiUrl,
});
const post = async (url, params, config) => {
  const {data} = await instance.post(url, params, config).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('response error ==>', error.response.data);
      console.error('status ==>', error.response.status);
      console.error('headers ==>', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('error request ==>', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Bitcoin api error post ==>', error.message);
    }
    console.error('config error ==>', error.config);
  });
  return data;
};
const get = async url => {
  const {data} = await instance.get(url).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('response error ==>', error.response.data);
      console.error('status ==>', error.response.status);
      console.error('headers ==>', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('error request ==>', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Bitcoin api error get ==>', error.message);
    }
    console.error('config error ==>', error.config);
  });
  return data;
};
const setBaseUrl = url => {
  instance.defaults.baseURL = url;
};
const BitcoinAPI = {
  post,
  get,
  setBaseUrl,
};
export default BitcoinAPI;

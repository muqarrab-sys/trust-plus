const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function pad(pad, str, padLeft) {
  if (typeof str === 'undefined')
    return pad;
  if (padLeft) {
    return (pad + str).slice(-pad.length);
  } else {
    return (str + pad).substring(0, pad.length);
  }
}
export const CommonUtil = {
  sleep,
  pad
};

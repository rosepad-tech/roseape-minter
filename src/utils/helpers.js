import axios from "axios";
import whitelist from "utils/whitelist";

export const centerEllipsis = (str, frontLen = 2, rearLen = 8) =>
  str && typeof str === "string"
    ? `${str.slice(0, frontLen)} ... ${str.slice(
      str.length - rearLen,
      str.length
    )}`
    : "";

export const bin2String = (hexx) => {
  var hex = hexx.toString(); //force conversion
  var str = "";
  for (var i = 0; i < hex.length && hex.substr(i, 2) !== "00"; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};


export const checkWhiteList = async (address) => {
  let result = false;
  await axios.get(`https://bafkreievqtzlzit4olewxewbez5smmiufmnqzqxo33chf3tt2sw6p2bssa.ipfs.dweb.link`)
    .then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].toLowerCase() === address.toLowerCase()) {
          console.log("User is whitelisted");
          result = true;
        }
      }
    }, (error) => {
      return false;
    });

  return result;
}

export const checkWhitelistManual = async (address) => {
  let result = false;
  for (let i = 0; i < whitelist.length; i++) {
    if (whitelist[i].toLowerCase() === address.toLowerCase()) {
      console.log("User is whitelisted");
      result = true;
    }
  }
  return result;
}
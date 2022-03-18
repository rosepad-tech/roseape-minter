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

export const centerEllipsis = (str, frontLen = 2, rearLen = 8) =>
  str && typeof str === "string"
    ? `${str.slice(0, frontLen)} ... ${str.slice(
        str.length - rearLen,
        str.length
      )}`
    : "";

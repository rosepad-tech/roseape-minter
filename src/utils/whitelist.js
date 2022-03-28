

    const ethers = require('ethers');
    const {ERC721} = require("./contracts.js");
    const jsonData= require('/Users/alvinreyes/Projects/roseproject/whitelist/wl.json');

    const signer = provider.getSigner();
    const address = signer.getAddress();
    const contract = new ethers.Contract(ERC721, ERC721ABI, signer);

// pages/api/getPrice.js

const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_URL));

const contractABI = [ /* ABIをここに挿入 */ ];
const contractAddress = '<DEXのコントラクトアドレス>';
const contract = new web3.eth.Contract(contractABI, contractAddress);

export default async function handler(req, res) {
  try {
    const reserves = await contract.methods.getReserves().call();
    const reserve0 = reserves._reserve0;
    const reserve1 = reserves._reserve1;
    const price = reserve1 / reserve0;

    res.status(200).json({ price });
  } catch (error) {
    console.error('Error fetching price:', error);
    res.status(500).json({ error: 'Error fetching price' });
  }
}

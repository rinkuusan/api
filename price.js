const Web3 = require('web3');

// RPCエンドポイントの設定
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.defi-verse.org/'));

// コントラクトの設定（適切なABIとコントラクトアドレスを記入）
const contractABI = [ /* ABIをここに挿入 */ ];
const contractAddress = '<DEXのコントラクトアドレス>';
const contract = new web3.eth.Contract(contractABI, contractAddress);

// メインの処理関数
module.exports = async (req, res) => {
  try {
    // リザーブを取得して価格を計算
    const reserves = await contract.methods.getReserves().call();
    const reserve0 = reserves._reserve0;
    const reserve1 = reserves._reserve1;
    const price = reserve1 / reserve0;

    // 結果をJSON形式で返す
    res.status(200).json({ price });
  } catch (error) {
    console.error('Error fetching price:', error);
    res.status(500).json({ error: 'Error fetching price' });
  }
};

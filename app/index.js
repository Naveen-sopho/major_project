const express = require('express');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransacationPool = require('../wallet/transaction-pool');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransacationPool();
const p2pServer = new P2pServer(bc, tp);


app.use(bodyParser.json());


app.get('/blocks', (req, res) => {
	res.json(bc.chain);
});



app.get('/transactions', (req, res) => {
	res.json(tp.transactions);
});

app.post('/transact', (req, res) => {
	const { speed , gps, alert, response, recipient} = req.body;
	
	const transaction = wallet.createTransaction(speed , gps, alert, response, recipient, tp);
	p2pServer.broadcastTransaction(transaction);
	res.redirect('/transactions');
});

app.get('/balance',(req,res)=>{
	res.json({Balance: wallet.balance});
});
app.get('/public-key', (req, res) => {
	res.json({ publicKey: wallet.publicKey});
});
app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
p2pServer.listen();


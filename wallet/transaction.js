const ChainUtil = require('../chain-util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

 


  static newTransaction(speed, gps, alert, response, senderWallet, recipient) {
    const transaction = new this();
    var oppush = {};
    oppush['Speed'] = speed;
    oppush['GPS'] = gps;
    oppush['Alert'] = alert;
    oppush['Response'] = response;
    oppush['Violated_vehicle'] = recipient;
   

    transaction.outputs.push(oppush);

    Transaction.signTransaction(transaction, senderWallet);

    return transaction;
  }
  static signTransaction(transaction,senderWallet) {
  	transaction.input = {
  		timestamp: Date.now(),
  		address: senderWallet.publicKey,
  		signature: senderWallet.sign(ChainUtil.hash(transaction.outputs)) 
  	}
  }

  static verifyTransaction(transaction) {
	return ChainUtil.verifySignature(
		transaction.input.address,
    transaction.input.signature,
    ChainUtil.hash(transaction.outputs)
  );
  }
}

module.exports = Transaction;

const ChainUtil = require('../chain-util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

 


  static newTransaction( alert, response, senderWallet, violated_vehicle) {
    const transaction = new this();
    var oppush = {};
    oppush['Alert'] = alert;
    oppush['Response'] = response;
    oppush['Violated_vehicle'] = violated_vehicle;
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

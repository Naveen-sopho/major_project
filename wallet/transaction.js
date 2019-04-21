const ChainUtil = require('../chain-util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

 /** update(speed, gps, alert,senderWallet, recipient) {
	const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

  if (amount > senderOutput.amount) {
    console.log(`Amount: ${amount} exceeds balance.`);
    return;
  }

  senderOutput.amount = senderOutput.amount - amount;
  this.outputs.push({ amount, address: recipient });
  Transaction.signTransaction(this, senderWallet);

  return this;
}**/


  static newTransaction(speed, gps, alert,senderWallet,recipient) {
    const transaction = new this();
    var oppush = {};
    oppush['Speed'] = speed;
    oppush['GPS'] = gps;
    oppush['Alert'] = alert;
    oppush['Violated_vehicle'] = recipient;
    //var oppush = ['Speed':speed,'Gps': gps, alert,recipient];

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

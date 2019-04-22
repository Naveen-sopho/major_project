const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');

class Wallet {
  constructor() {
    this.balance = 500;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey =  this.keyPair.getPublic().encode('hex');

  }

  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance   : ${this.balance}`
  }
  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  addbalance(addwallet,addamount)
  {
    this.addwallet.balance += addamount;
  }
  createTransaction(speed, gps, alert, response, recipient, transactionPool) {
  
    let transaction = Transaction.newTransaction(speed,gps,alert, response, this, recipient);
    transactionPool.updateOrAddTransaction(transaction);

  return transaction;
}


}

module.exports = Wallet;

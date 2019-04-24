const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const Smartcontract = require('../app/smartcontract');
const TransactionPool = require('./transaction-pool');

class Wallet {
  constructor() {
    this.balance = 500;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey =  this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance   : ${this.balance}
    keybalance: ${this.keybalance}`
  }
  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }
  createTransaction( alert, response, violated_vehicle, transactionPool) {
  
    let transaction = Transaction.newTransaction(alert, response, this, violated_vehicle);
    transactionPool.updateOrAddTransaction(transaction);

  return transaction;
}


}

module.exports = Wallet;

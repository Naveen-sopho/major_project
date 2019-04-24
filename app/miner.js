const Wallet=require('../wallet');
const Transaction=require('../wallet/transaction');
const TransactionPool = require('../wallet/transaction-pool');

class Miner
{
    constructor(blockchain,transactionPool,wallet,p2pServer)
    {
        this.blockchain=blockchain;
        this.transactionPool=transactionPool;
        this.wallet=wallet;
        this.p2pServer=p2pServer;
    }

    mine()
    {
       // const validTransactions=this.transactionPool.validTransactions();
       // validTransactions.push(Transaction.rewardTransaction(this.wallet,Wallet.blockchainWallet()));
       if(this.transactionPool.addif==1)
       {
        const block=this.blockchain.addBlock(this.transactionPool.transactions);
        this.p2pServer.syncChains();
        this.transactionPool.clear();
        //TransactionPool.clear();
        this.p2pServer.broadcastClearTransactions()
        return block;
        }
        return;
    }
}

module.exports=Miner;
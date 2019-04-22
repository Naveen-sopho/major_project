class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transactions.find(t => t.id === transaction.id);
    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
    var yc = 0;
    var nc = 0;
    var jresp = this.transactions;
    console.log('socket count = ', require('../app/smartcontract').scount);
    for(var i in jresp)
    {
      var jrespout = jresp[i].outputs;
      for(var j in jrespout)
      if(jrespout[j].Response == "yes")
      {
        yc++;
      }
      else
      {
        nc++;
      }  
    }
    var tc = yc+nc;
    if(tc== require('../app/smartcontract').scount)
    {
      yc = yc * 100;
      if(yc/tc>60)
      {
        console.log('Response received');
      }

    }
    console.log('Ycount',yc);
    

  }
}

module.exports = TransactionPool;
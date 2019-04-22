

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
    var yacc = [];
    var yaccadd = [];
    var vivehi;
    var nacc=0;
    console.log('socket count = ', require('../app/smartcontract').scount);
    for(var i in jresp)
    {
      var jrespout = jresp[i].outputs;
      for(var j in jrespout)
      {
      if(jrespout[j].Response == "yes")
      {
        yc++;
        yacc.push(1);
        nacc++;
        vivehi=jrespout[j].Violated_vehicle;
      }
      else
      {
        nc++;
        yacc.push(0);
      } 
      } 
    }
    var acpri = 10/nacc;
    var tc = yc+nc;
    console.log('Violated_vehicle : ', vivehi);
    if(tc== require('../app/smartcontract').scount)
    {
      yc = yc * 100;
      if(yc/tc>60)
      {
        var cnt = 0;
        for(var i in jresp)
        {
          var jrespinp = jresp[i].input;
          if(yacc[cnt]==1)
          {
            console.log(jrespinp.address);
          }
          cnt++;
          
        }
        console.log('Response received');
       // console.log(yaccadd);

      }

    }
    console.log('Ycount',yc);
    
  }
}

module.exports = TransactionPool;
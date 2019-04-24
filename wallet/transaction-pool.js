var keys = [];
var bals = [];

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
    var tc = yc+nc;
    if(tc== require('../app/smartcontract').scount)
    {
      
        for(var i in jresp)
        {
          var jrespinp = jresp[i].input;
          var pre = 0;
          for(var k in keys)
          {
            if(jrespinp.address == keys[k])
            {
              pre = 1;
            }
          }
          if(pre==0)
          {
            keys.push(jrespinp.address);
            bals.push(500);
          }
          var pre = 0;
          for(var k in keys)
          {
            if(vivehi == keys[k])
            {
              pre = 1;
            }
          }
          if(pre==0)
          {
            keys.push(vivehi);
            bals.push(500);
          }
        }

    }
    console.log(keys);
    console.log(bals);
    var acpri = 10/nacc;
    if(tc== require('../app/smartcontract').scount)
    {
   
     
      yc = yc * 100;
      if(yc/tc>60)
      {
         var index ;
        for(var k in keys)
        {
          if(vivehi == keys[k])
          {
              index = k;
              bals[index]= bals[index] - 10;
          }
        }

        var cnt = 0;
        for(var i in jresp)
        {
          var jrespinp = jresp[i].input;
          if(yacc[cnt]==1)
          {
            for(var k in keys)
            {
              if(jrespinp.address == keys[k])
              {
                index = k;
                bals[index]= bals[index] + acpri;
              }

            }

          }
          cnt++;
          this.transactions = [];

          
        }


      }

    }
    for(var s in keys)
    {
      console.log(keys[s].substring(0,6));
    }
    for(var s in bals)
    {
      console.log(bals[s]);
    }
    
  }

 
}


module.exports = TransactionPool;
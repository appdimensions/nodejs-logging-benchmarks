var winston = require('winston');

require('winston-syslog');

winston.add(winston.transports.Syslog, {
    level: 'debug',
    protocol: 'tcp4'
});

// INITIALIZATION //
var primeNumProc = require('child_process'),
ls = primeNumProc.fork('../primenumbers');

var it=1;

var hrstart, hrend;

winston.debug("Debug message INIT\n");

setTimeout(proc, 5000);
function proc(){

    hrstart = process.hrtime();

    for(var i=1; i<=100000; i++){
        winston.debug('WIP-ROUND1 it:' + it + ' Debug message: #' + i + "\n");
    }

    hrend = process.hrtime(hrstart);
    console.info("Execution time: %dms", hrend[0]*1000 + hrend[1]/1000000);
    
    it++;
    
    if(it === 11){
        setTimeout(function(){console.log("Finished");ls.kill();process.exit();}, 20000);
    }else{
        setTimeout(proc, 5000);
    
    }
}

process.on('exit', function() {
  if (ls) {
    ls.kill();
  }
});
var bunyan = require('bunyan');
var bsyslog = require('bunyan-syslog');

var log = bunyan.createLogger({
    name: 'foo',
    streams: [ {
        level: 'debug',
        type: 'raw',
        stream: bsyslog.createBunyanStream({ // UDP by default
            //type: 'tcp',
            facility: bsyslog.local0,
            host: '127.0.0.1',
            port: 514
        })
    }]
});

// INITIALIZATION //
var primeNumProc = require('child_process'),
ls = primeNumProc.fork('../primenumbers');

var it=1;

var hrstart, hrend;

log.debug('Debug message INIT');

setTimeout(proc, 5000);
function proc(){

    hrstart = process.hrtime();

    for(var i=1; i<=100000; i++){
        log.debug('BNP-ROUND1 it:' + it + ' Debug message: #' + i);
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
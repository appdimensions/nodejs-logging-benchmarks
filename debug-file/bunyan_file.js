var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'foo',
    streams: [ {
        level: 'debug',
        path: '/home/ubuntu/serverfiles/logs/bunyan.log'
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

    for(var i=1; i<=10000; i++){
        log.debug('BNY-ROUND1 it:' + it + ' Debug message: #' + i);
    }

    hrend = process.hrtime(hrstart);
    console.info("Execution time: %dms", hrend[0]*1000 + hrend[1]/1000000);

    it++;
    
    if(it === 101){
        setTimeout(function(){console.log("Finished");ls.kill();process.exit();}, 20000);
    }else{
        setTimeout(proc, 1000);
    
    }

}

process.on('exit', function() {
  if (ls) {
    ls.kill();
  }
});
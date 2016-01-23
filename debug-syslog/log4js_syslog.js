var log4js = require('log4js');

log4js.configure({
    appenders: [ 
    { 
        type: 'log4js-syslog-appender', 
        category: 'log4js', 
        facility: 'local0', 
        hostname: 'localhost', 
        port: 514
    }
]});

/* For TCP, use this instead:

log4js.configure({
    appenders: [ 
    { 
        type: 'log4j-tcp',
        loggerHost: 'localhost', 
        loggerPort: 514,
        category: 'log4js'
    }
]});

*/

var log = log4js.getLogger('log4js');

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
        log.debug('LJS-ROUND1 it:' + it + ' Debug message: #' + i);
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
const Logger = require('./lib/Logger');
const logger = new Logger();

// non async
logger.log('a');
logger.log('b');
logger.log('c');
logger.log('d');

// simulate async
setTimeout(function() {
    logger.log(1);
    logger.log(2);
    logger.log(3);
    logger.log(4);
}, 2000);


setTimeout(function() {
    logger.log(5);
    logger.log(6);
    logger.log(7);
    logger.log(8);
}, 5000);

setTimeout(function() {
    logger.log(9);
    logger.log(10);
    logger.log(11);
    logger.log(12);
}, 10000);

setTimeout(function() {
    logger.log(13);
    logger.log(14);
    logger.log(15);
}, 15000);

setTimeout(function() {
    logger.subscription.unsubscribe();
    process.exit(0);
}, 19000);


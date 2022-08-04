// //1st
// // module.exports = function(err,  req, res, next){
// //      // Log the exeception
// //      res.status(500).send('Something  failed.');
// //     }

// //2nd use winston to store error in file
const winston = require('winston');
module.exports = function(err, req, res, next){
 winston.error(err.message, err);
 // error
 // warn
 // info
 // verbose
 // debug 
 // silly
 res.status(500).send('Something failed.');
}

module.exports = function(err, req, res, next){
    // Log the exeception
  res.status(500).send('Something failed.');
}


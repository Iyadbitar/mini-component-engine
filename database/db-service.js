var dbConnection = require('./db-connection');
var instance;

var DBService = function() {
  if(!instance){
    instance = this;
  }
  return instance;
};

DBService.prototype.isQuerying = false;
DBService.prototype.error = null;

DBService.prototype.query = function(query){

  this.isQuerying = true;

  return new Promise(function(resolve, reject){
    dbConnection.query(query, function(error, result) {
        this.isQuerying = false;
        if (error) {
          this.error = error;
          reject(error);
          return;
        }
        resolve(result);
      });
  });
}

DBService.prototype.escape = function(str) {
  return str.replace(/[']/g, '\\\'');
}

DBService.prototype.end = function() {
  dbConnection.end();
}

module.exports = DBService;

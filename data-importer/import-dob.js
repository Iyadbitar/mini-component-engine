"user strict"
var fetch = require('node-fetch');
var mysql = require('mysql');
var DBService = require('../database/db-service');

var tableName = 'jobs';
var db = new DBService();

async function getData(){
  var response = await fetch('https://data.cityofnewyork.us/resource/rvhx-8trz.json?$order=job__ ASC')
  return await response.json();
}

async function createTable(sql) {
  return await db.query(sql);
}

function jsonToSql(row){
  var keys = Object.keys(row);
  var values = keys.reduce( (acc, key) => {
    acc.push(row[key].replace(/'/g, "\\'").replace(/(\s*$)|(^\s*)/g, ''));
    return acc;
  }, []);
  return 'REPLACE INTO ' + tableName + ' (' + keys.join(', ') + ') VALUES (\'' + values.join('\', \'') + '\');'
}

async function insertRow(row) {
  var insertSql = jsonToSql(row);
  return await db.query(insertSql)
}

async function insertAll(data) {
  let insertPromises = data.map( (item) => {
    return insertRow(item)
  });
  return await Promise.all(insertPromises);
}

getData()
.then(function(result){
  var data = result.slice();
  var allKeys = Object.keys(data.reduce( (acc, item) => Object.assign(acc, item), {}));
  var columns = allKeys.map((column) => column + (column === 'job__' ? ' varchar(10) NOT NULL' : ' text NULL'));
  var createSql = 'CREATE TABLE IF NOT EXISTS jobs (id bigint NOT NULL AUTO_INCREMENT, ' + columns.join(', ') +', PRIMARY KEY (id), UNIQUE (job__) );';
  createTable(createSql);
  return data;
})
.then( (data) => insertAll(data) )
.then( (res) => {
  console.log('\n\x1b[42m\x1b[30m', `Successfully ${res.length} DOB jobs inserted in local database.`, '\x1b[0m\n');
  endProcess();
})
.catch( (err) => {
  console.log('\n\x1b[31m\x1b[30m', err, '\x1b[0m\n');
  endProcess();
})

function endProcess(){
  db.end();
  process.exit();
}

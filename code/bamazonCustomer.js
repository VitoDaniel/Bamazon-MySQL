// required dependecies
var inquirer = require('inquirer');
var mysql = require('mysql');

// define mySQL connection parameters
var connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: '',

    database: 'Bamazon'
})

connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('Connected as id: ' + connection.threadId);
})



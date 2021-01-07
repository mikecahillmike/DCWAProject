var mysql = require('promise-mysql')
const MongoClient = require('mongodb').MongoClient 
const url = 'mongodb://localhost:27017' 


var pool
const dbName = 'headsOfStateDB'
const collName = 'headsOfState'

var headsOfStateDB
var headsOfState

mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'geography',
    insecureAuth: true,
    multipleStatements: true
})
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log(error)
    });

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        headsOfStateDB = client.db(dbName)
        headsOfState = headsOfStateDB.collection(collName)
    })
    .catch((error) => {  // Catch error
        console.log(error)
    })

var getCountries = function () {
    return new Promise((resolve, reject) => {
        pool.query('Select * from country')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var getCities = function () {
    return new Promise((resolve, reject) => {
        pool.query('Select * from city')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var getHeadsOfStates = function () {
    return new Promise((resolve, reject) => {
        var cursor = headsOfState.find()
        if (cursor.cursorState.cmd.find != 'headsOfStateDB.headsOfState') {  
            reject('Wrong DB/Collection')
        } else {
            cursor.toArray()
                .then((documents) => {
                    resolve(documents)
                })
                .catch((error) => {
                    reject(error)
                })
        }
    })
}
    module.exports = { getCountries, getCities, getHeadsOfStates}
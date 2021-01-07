var express = require('express')
var app = express()
var mysqlDAO = require('./mysqlDAO')
var bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/views/index.html")
 })
 
 app.get('/getCountries', (req, res)=>{
     mysqlDAO.getCountries()
     .then((result)=>{
         res.render('getCountries', {countries:result})
     })
     .catch((error)=>{
         res.send(error)

     })
 })

 
 app.get('/getHeadsOfState', (req, res)=>{
    mysqlDAO.getHeadsOfStates()
    .then((documents)=>{
        res.render('getHeadsOfState', {heads:documents})
    })
    .catch((error)=>{
        res.send('<h1> Error Message</h1>');
    })
})

 app.get('/getCities', (req, res)=>{
    mysqlDAO.getCities()
    .then((result)=>{
        res.render('getCities', {cities:result})
    })
    .catch((error)=>{
        {
            res.send(error)
        }
    })
})


 app.listen(3000, () => {
    console.log("Listening on port 3000")
})
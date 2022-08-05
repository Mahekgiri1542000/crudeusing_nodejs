const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const PoolCluster = require('mysql/lib/PoolCluster');
const Connection = require('mysql/lib/Connection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true})); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
// app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
// app.set('view engine', 'hbs');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Route 
app.get('/', (req, res) => {
    res.render('home');
});


// Conection pool


const pool =mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
});
 
const route = require('./server/routes/user')



// Connection Pool
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO user(first_name, last_name, email, phone, comments, status) VALUES ('mahek', 'giri','test32@gmail.com','878064665','Hello','active')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });








//cont pool

pool.getConnection((err, connection) => {

    if(err) {
        throw err;
    }else{
        console.log("This is deon");
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
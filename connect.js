var express = require("express");
var mysql = require("mysql");
var app = express();
var cors = require("cors");
const session = require('express-session');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));



var conexion = mysql.createConnection({
    host: "localhost",
    user: "christian",
    password: "2002",
    database: "dbFormulario",
});

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("Conexión exitosa");
    }
});

// http://localhost:3000/
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/static/index.html'));
});

// http://localhost:3000/login
app.get('/login', function (request, response) {
    response.sendFile(path.join(__dirname + '/static/login.html'));
});

// http://localhost:3000/api/pedido
app.post("/api/pedido", (req, res) => {
    let data = {
        nomcon: req.body.NOMCON,
        apecon: req.body.APECON,
        celcon: req.body.CELCON,
        emacon: req.body.EMACON,
        msgcon: req.body.MSGCON
    };
    let sql = "INSERT INTO Contactenos SET ?";
    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error;
        } else {
            console.log(data);
            res.send(data);
        }
    });
});


// http://localhost:3000/auth
app.post('/auth', function (request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        conexion.query('SELECT * FROM accounts WHERE username = ? AND pass = ?', [username, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                response.redirect('/home');
            } else {
                response.send('Usuario y/o Contraseña Incorrecta');
            }
            response.end();
        });
    } else {
        response.send('Por favor ingresa Usuario y Contraseña!');
        response.end();
    }
});

app.get('/home', function (request, response) {
    // If the user is loggedin
    if (request.session.loggedin) {
        // Output username
        response.send('Te has logueado satisfactoriamente:, ' + request.session.username + '!');
    } else {
        // Not logged in
        response.send('¡Inicia sesión para ver esta página!');
    }
    response.end();
});


const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function () {
    console.log("Servidor funcionando en puerto: " + puerto);
});
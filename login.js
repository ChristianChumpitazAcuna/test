var express = require("express");
var mysql = require("mysql");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

var conexion = mysql.createConnection({
    host: "44.194.135.43",
    user: "christian",
    password: "2002",
    database: "login-socket"
});

conexion.connect(function (error) {
    if (error) {
        console.log(error)
        throw error;
    } else {
        console.log("Login Conexión exitosa");
    }
});

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function () {
    console.log("Servidor funcionando en puerto: " + puerto);
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

// http://localhost:3000/auth
app.post('/auth', function (request, response) {
    console.log('DATOS : ', request.body);
    let username = request.body.username;
    let password = request.body.password;

    if (username && password) {

        conexion.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                response.send('Te has logueado satisfactoriamente:, ' + request.body.username + '!');
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
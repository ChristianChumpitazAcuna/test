var express = require("express");
var mysql = require("mysql");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

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

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function () {
    console.log("Servidor funcionando en puerto: " + puerto);
});

app.post("/api/PEDIDO", (req, res) => {
    let data = {
        userped: req.body.USERPED,
        emausped: req.body.EMAUSPED,
        celusped: req.body.CELUSPED,
        foodped: req.body.FOODPED,
        msgped: req.body.MSGPED
    };
    let sql = "INSERT INTO PEDIDO SET ?";
    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error;
        } else {
            console.log(data);
            res.send(data);
        }
    });
});
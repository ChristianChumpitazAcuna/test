//Utilizando Visual Code creamos el archivo connect.js y agregamos el siguiente código:
var express = require("express");
var mysql = require("mysql");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({
    host: "localhost",
    user: "christian",
    password: "2002",
    database: "dbFormulario",
  });
//Para verificar si la conexión se ha realizado
//ingresamos las siguientes líneas de código en el archivo connect.js
  conexion.connect(function (error) {
    if (error) {
      throw error;
    } else {
      console.log("Conexión exitosa");
    }
  });

//Ahora procedemos a configurar el puerto de salida
//de la aplicación con el siguiente 
//código en el mismo archivo connect.js
const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function () {
  console.log("Servidor funcionando en puerto: " + puerto);
});

//Agregamos las siguientes líneas de código 
//JavaScript  en el mismo archivo ‘connect.js’ 
//para permitir la inserción de registros en la tabla.

app.post("/api/pedido", (req, res) => {
	let data = {
    	userped: req.body.USERPED,
    	emauser: req.body.EMAUSER,
    	celuuser: req.body.CELUUSER,
    	menped: req.body.MENPED,
    	msgped: req.body.MSGPED
	};
	let sql = "INSERT INTO pedido SET ?";
	conexion.query(sql, data, function (error, results) {
  	if (error) {
    	throw error;
  	} else {
    	console.log(data);
    	res.send(data);
  	}
	});
  });



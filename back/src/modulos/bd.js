//administracion de la Bd.
// INSTACIAR la libreria MySQL
const mysql = require("mysql2"); // principio de inmutalidad

// cadena de conexion
const cnx = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

cnx.connect((error) => {
  if (error) {
    console.log(`Error en la conexoin \n ${error}`);
  } else {
    console.log(" conexion Exitosa a la BD!");
  }
});
module.exports = cnx;

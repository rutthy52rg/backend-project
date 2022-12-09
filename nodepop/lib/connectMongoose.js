//conexion a la base de datos con moongoose

const mongooseConnect = require("mongoose");

mongooseConnect.connection.on("error", (err) => {
  console.log("error de conexion ");
  process.exit(1);
});

mongooseConnect.connection.once("open", () => {
  console.log("conectado a mongoDB en", mongooseConnect.connection.name);
});

mongooseConnect.connect(process.env.MONGODB_CONNECTION_STRING); //variable entorno desde el fichero .env

//lo exportamos para poder cargarlo en cualquier zona del proyecto
module.exports = mongooseConnect.connection;

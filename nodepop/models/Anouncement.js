const mongoose = require("mongoose");

// definimos el esquema
const anouncementSchema = mongoose.Schema({
  name: String,
  sale: Boolean,
  price: Number,
  picture: String,
  tags: Array
});

//para methods estatico del modelo
anouncementSchema.statics.showAll = function () {
  const query = Anouncement.find();  

  //devuelve promesa
  return query.exec();
};

//para methods estatico del modelo
anouncementSchema.statics.lista = function (filtro, skip, limit,fields, sort) {
  const query = Anouncement.find(filtro);  
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  
  //devuelve promesa
  return query.exec();
};


// creamos el modelo
const Anouncement = mongoose.model("Anouncement", anouncementSchema);

// exportamos el modelo (opcional)
module.exports = Anouncement;

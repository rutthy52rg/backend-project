const mongoose = require("mongoose");

// definimos el esquema
const anouncementSchema = mongoose.Schema({
  name: { type: String, index: 1 },
  sale: Boolean,
  price: { type: Number, index: -1 },
  picture: String,
  tags: { type: [String], index: true },
});

//anouncementSchema.index({ name: 1, price: -1, tags: 1 });

//para methods estatico del modelo
anouncementSchema.statics.showAll = function () {
  const query = Anouncement.find();

  //devuelve promesa
  return query.exec();
};

//para methods estatico del modelo
anouncementSchema.statics.lista = function (filtro, skip, limit, fields, sort) {
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
// vamos a ver los índices en anouncements
Anouncement.collection
  .getIndexes({ full: true })
  .then((indexes) => {
    console.log("indexes:", indexes);
  })
  .catch(console.error);

// exportamos el modelo (opcional)
module.exports = Anouncement;

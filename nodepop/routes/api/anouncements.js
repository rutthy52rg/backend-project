const express = require("express");
const router = express.Router();
const Anouncement = require("../../models/Anouncement");

// GET /api/anouncements
// Devuelve una lista de agentes
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const userId = req.apiUserId;
    console.log("userid:", userId);
    // filtros
    const name = req.query.name;
    const sale = req.query.sale;
    const tags = req.query.tags;
    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;

    // selección de campos
    const fields = req.query.fields;
    const sort = req.query.sort;

    // ejemplos de peticiones
    // http://localhost:3000/api/agentes/?skip=2&limit=2&fields=name%20-_id
    // http://localhost:3000/api/agentes/?sort=age%20-name

    // creo el filtro vacio
    const filtro = {};

    if (name) {
      filtro.name = new RegExp("^" + name, "i");
    }
    if (sale) {
      filtro.sale = sale;
    }
    if (tags) {
      filtro.tags = { $all: [tags] };
    }

    const anouncements = await Anouncement.lista(
      filtro,
      skip,
      limit,
      fields,
      sort
    );

    res.json({ results: anouncements });
  } catch (err) {
    next(err);
  }
});

// POST /api/agentes (body)
// Crea un anuncio
//
router.post("/post/", async (req, res, next) => {
  try {
    const anonucementData = req.body;

    // instanciamos objeto en memoria
    const anouncement = new Anouncement(anonucementData);

    // lo guardamos en la base de datos
    const anouncementSaved = await anouncement.save();

    res.json({ result: anouncementSaved });
  } catch (error) {
    next(error);
  }
});

// Actualizar un anuncio
// PUT => localhost:3001/api/anouncements/_id
router.put("/put/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;

    const anouncementActualizado = await Anouncement.findOneAndUpdate(
      { _id: _id },
      data,
      {
        new: true, // esto hace que nos devuelva el documento actualizado
      }
    );

    res.json({ result: anouncementActualizado });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/anouncement/:_id
// Eliminar un anuncio
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;

    await Anouncement.deleteOne({ _id: _id });

    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

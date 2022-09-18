var express = require("express");
var router = express.Router();

const Anouncement = require("../models/Anouncement");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const page = 1;
    const tagsArray = [];
    const url = req.url;
    // filtros
    const name = req.query.name;
    const sale = req.query.sale;
    const tags = req.query.tags;
    const price = req.query.price;
    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;
    const currentSkip = skip * page - skip;

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
    if (price) {
      if(price === "10€-50€" ){
        filtro.price = { $gte: 0, $lte: 50 };
      } else if (price === "desde que 10€" ){
        filtro.price = { $gte: 10 };
      } else if (price === "hasta 50€") {
        filtro.price = { $lte: 50 };
      } else {
        filtro.price = 50;
      }
    }

    const anouncements = await Anouncement.lista(
      filtro,
      skip,
      limit,
      fields,
      sort
    );

    anouncements.forEach((ele, index) => {
      tagsArray.push(...ele.tags);
    });

    const tagsArryNoRepeat = tagsArray.filter((item, pos) => {
      return tagsArray.indexOf(item) == pos;
    });

    res.locals.name = name;
    res.locals.tags = tags;
    res.locals.sale = sale;
    res.locals.sort = sort;
    res.locals.price = price;
    res.locals.tagsArray = tagsArryNoRepeat;
    res.locals.i = 0;
    res.locals.url = url;
    res.locals.skip = skip;
    res.locals.limit = limit;
    res.locals.currentSkip = currentSkip;
    res.locals.pictUrl = "../public/images/";

    res.render("index", {
      title: "NodePOP Aplication",
      anouncements: anouncements,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

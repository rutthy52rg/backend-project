'use strict';

const readline = require('readline');

// conectar a la base de datos
const connection = require('./lib/connectMongoose');

// cargar los modelos
const Anouncement = require('./models/Anouncement');

async function main() {
  const continuar = await pregunta('Estas seguro, seguro, seguro, de que quieres borrar toda la base de datos y cargara datos iniciales? ');
  if (!continuar) {
    process.exit();
  }

  // inicializar la colección de agentes
  await initAnouncements();

  connection.close();

}

main().catch(err => console.log('Hubo un error:', err));

async function initAnouncements() {
  // borrar todos los documentos de anuncios
  const deleted = await Anouncement.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anouncements.`);

  // crear agentes iniciales
  const inserted = await Anouncement.insertMany([
    {
      name: "bicicleta",
      sale: true,
      price: 220,
      picture: "bicicleta.png",
      tags: ["deporte", "aire libre"],
    },
    {
      name: "coche",
      sale: true,
      price: 15500,
      picture: "coche.png",
      tags: ["motor"],
    },
    {
      name: "ordenador",
      sale: false,
      price: 1500,
      picture: "ordenador.png",
      tags: ["technology"],
    },
    {
      name: "moto",
      sale: false,
      price: 300,
      picture: "moto.png",
      tags: ["motor"],
    },
    {
      name: "moto2",
      sale: true,
      price: 300,
      picture: "moto2.png",
      tags: ["motor"],
    },
    {
      name: "zapatillas",
      sale: true,
      price: 25,
      picture: "zapatillas.png",
      tags: ["sport"],
    },
    {
      name: "pelota",
      sale: true,
      price: 40,
      picture: "pelota.png",
      tags: ["sport"],
    },
    {
      name: "chandal",
      sale: false,
      price: 70,
      picture: "chandal.png",
      tags: ["lifestyle", "sport"],
    },
    {
      name: "piragua",
      sale: true,
      price: 220,
      picture: "piragua.png",
      tags: ["lifestyle", "sport"],
    },
    {
      name: "caravana",
      sale: true,
      price: 35000,
      picture: "caravana.png",
      tags: ["lifestyle", "motor"],
    },
    {
      name: "patines",
      sale: true,
      price: 50,
      picture: "patines.png",
      tags: ["lifestyle",],
    },
  ]);
  console.log(`Creados ${inserted.length} anuncios.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {

    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    ifc.question(texto, respuesta => {
      ifc.close();
      if (respuesta.toLowerCase() === 'y'){
        resolve(true);
        return;
      }
      resolve(false);
    })

  });

}
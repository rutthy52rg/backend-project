"use strict";

require("dotenv").config(); //carga librería y con config lee el fichero env

const readline = require("readline");

// conectar a la base de datos
const connection = require("./lib/connectMongoose");

// cargar los modelos
//const Anouncement = require("./models/Anouncement");
const { Anouncement, User } = require("./models");

async function main() {
  const continuar = await pregunta(
    "Estas seguro, seguro, seguro, de que quieres borrar toda la base de datos y cargara datos iniciales? y/n \n"
  );
  if (!continuar) {
    process.exit();
  }

  // inicializar la colección de agentes
  await initAnouncements();
  // inicializar la colección de agentes
  await initUsers();

  connection.close();
}

main().catch((err) => console.log("Hubo un error:", err));

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
      tags: ["lifestyle"],
    },
  ]);
  console.log(`Creados ${inserted.length} anuncios.`);
}

async function initUsers() {
  // borrar todos los documentos de anuncios
  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} users.`);

  // crear agentes iniciales
  const inserted = await User.insertMany([
    {
      email: "user@example.com",
      password: await User.hashPassword("1234"),
    },
    {
      email: "romeo@romeo.com",
      password: await User.hashPassword("mandocandado"),
    },
    {
      email: "julieta@julieta.com",
      password: await User.hashPassword("usocandado"),
    },
    {
      email: "man@inthemiddle.com",
      password: await User.hashPassword("quevoy"),
    },
  ]);
  console.log(`Creados ${inserted.length} users.`);
}
function pregunta(texto) {
  return new Promise((resolve, reject) => {
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    ifc.question(texto, (respuesta) => {
      ifc.close();
      if (respuesta.toLowerCase() === "y") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}

"use strict";
const nodemailer = require("nodemailer");

// se añadirá al models de users y se llamará en login

module.exports = async function () {
  //entorno de desarrollo
  const testAccount = await nodemailer.createTestAccount(); //creamos test
  const developConfig = {
    // configuramos test
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  };
  const productionConfig = {
    // configuramos test
    service: process.env.EMAIL_SERVICE_NAME,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    },
  };
  const activeConfig =
    process.env.NODE_ENV === "development" ? developConfig : productionConfig;
  console.log("entorno: ", process.env.NODE_ENV);

  const transport = nodemailer.createTransport(activeConfig); //creamos transport
  return transport;
};

const db = require("./models");
const mongoose = require("mongoose");
const tweetSeeder = require("./seeders/tweetSeeder");
const userSeeder = require("./seeders/userSeeder");

module.exports = async () => {
  mongoose.connect("mongodb://localhost/ejercicio_twitter");
  mongoose.connection
    .once("open", () =>
      console.log("¡Conexión con la base de datos establecida!")
    )
    .on("error", (error) => console.log(error));

  // await userSeeder();
  // await tweetSeeder();
  console.log("[Database] Se han insertado los datos");
};

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4100; // CONFIGURAMOS EL PUERTOs
app.use(cors());
app.use(express.json());

app.use("/", require("./src/modulos/historial.js")); // traemos nuestra libreria historial de delitos
app.use("/", require("./src/modulos/citizen.js")); // traemos nuestra libreria citizen.
app.use("/", require("./src/modulos/delitos.js")); // traemos nuestra libreria delitos.
app.use("/", require("./src/modulos/especie.js")); // traemos nuestra libreria especie.
app.use("/", require("./src/modulos/roles.js")); // traemos nuestra libreria roles.
app.use("/", require("./src/modulos/usuario.js")); // traemos nuestra libreria usuarios
app.use("/", require("./src/modulos/gradoDelito.js")); // traemos nuestra libreria grado de delitos
app.listen(PORT, () => {
  console.log(`Server running in : 4100 `);
});

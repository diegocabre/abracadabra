const express = require("express");
const app = express();
const PORT = 3000;

const usuarios = ["Diego", "Bianca", "Nacho", "Edu"];

// Definir el servidor.
app.listen(3000, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Middleware para validar si el usuario existe
const validarUsuarioMiddleware = (req, res, next) => {
  const usuario = req.params.usuario;
  if (usuarios.includes(usuario)) {
    next(); // Usuario válido, pasa al siguiente middleware o ruta
  } else {
    res.sendFile("/assets/who.jpeg", { root: __dirname }); // Usuario no válido, devuelve la imagen
  }
};

// Ruta GET
app.get("/abracadabra/juego/:usuario", validarUsuarioMiddleware, (req, res) => {
  const usuario = req.params.usuario;
  res.send(`<center><h1>¡Bienvenido al juego, ${usuario}!</h1> </center>`);
});

// Crear en el servidor un arreglo de nombres y devolverlo en formato JSON
app.get("/abracadabra/usuarios", (req, res) => {
  res.json(usuarios);
});

// Ruta que devuelve una imagen de conejo o de Voldemort
app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = parseInt(req.params.n);
  const num = Math.floor(Math.random() * 4) + 1;
  if (n === num) {
    res.sendFile(__dirname + "/assets/conejito.jpg");
  } else {
    res.sendFile(__dirname + "/assets/voldemort.jpg");
  }
});

// Ruta genérica para manejar rutas no definidas
app.get("*", (req, res) => {
  res.send("Esta página no existe...");
});

const express = require('express');
const morgan = require('morgan');
// const path = require()
const cors = require('cors');

const app = express();


app.use(morgan('dev'));
// Quan s'envi un metode 'post' atraves de un formulari, el servidor el podra entendra i es podra gestionar
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(require('./src/routes/index'));

// Fer publica la carpeta per accedir a un HTML, directament des del servidor
// app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;



const express = require('express');
const burgerController = require('./controller/burgerController');

const app = express();

app.use(express.json());

app.get('/burgers', burgerController.getAll);
app.get('/burgers/:id', burgerController.getById);

module.exports = app;
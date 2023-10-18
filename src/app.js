const express = require('express');
const burgerController = require('./controller/burgerController');
const ordersController = require('./controller/ordersController');
const { validateOrder } = require('./middleware/validateOrder');

const app = express();

app.use(express.json());

app.get('/burgers', burgerController.getAll);
app.get('/burgers/:id', burgerController.getById);
app.post('/burgers', burgerController.insert);
app.put('/burgers/:id', burgerController.updateById);
app.delete('/burgers/:id', burgerController.deleteById);
app.post('/orders', validateOrder, ordersController.insert);
app.get('/orders/:id', ordersController.getOrderById);
app.get('/orders', ordersController.getAllOrders);

module.exports = app;
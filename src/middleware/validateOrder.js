const burgerService = require('../service/burgerService');

const validateOrder = async (req, res, next) => {
  const orders = req.body;
  const { message } = await burgerService.getAll();

  for (let i = 0; i < orders.length; i += 1) {
    const findBurger = message.some((burger) => burger.id === orders[i].burgerId);
    if (!findBurger) {
      return res.status(404).json({ message: 'O hamburger não foi encontrado' });
    }
  }

  next();
};

module.exports = {
  validateOrder,
};
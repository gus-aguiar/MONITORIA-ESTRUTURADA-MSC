const sinon = require('sinon');
const { expect } = require('chai');
const burgerService = require('../src/service/burgerService');
const burgerModel = require('../src/model/burgerModel');

const burgers = [
  {
    id: 1,
    name: 'Burger SASSboroso',
  },
  {
    id: 2,
    name: 'PyBurger',
  },
  {
    id: 3,
    name: 'Cheese-Hook',
  },
];

const newBurger = {
  name: 'React Triplo Cheddar',
};

const dataToUpdate = { name: 'X-Hook' };

describe('burgerService', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET /burgers', function () {
    it('get all burgers successfully', async function () {
      sinon.stub(burgerModel, 'getAll').resolves(burgers);

      const result = await burgerService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(burgers);
    });

    it('get a burger by id', async function () {
      sinon.stub(burgerModel, 'getById').resolves(burgers[0]);

      const result = await burgerService.getById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(burgers[0]);
    });

    it('cannot get a burger with an invalid id', async function () {
      const result = await burgerService.getById(99);

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Burger not found');
    });
  });

  describe('POST /burgers', function () {
    it('create a new burger', async function () {
      sinon.stub(burgerModel, 'insert').resolves({ ...newBurger, id: 4 });

      const result = await burgerService.insert(newBurger);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal({ ...newBurger, id: 4 });
    });

    it('cannot create a burger with an invalid name', async function () {
      const result = await burgerService.insert({ name: 'Burg' });

      expect(result.type).to.be.equal('INVALID_DATA');
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('cannot create a burger without a name', async function () {
      const result = await burgerService.insert({});
      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.be.equal('"name" is required');
    });
  });

  describe('PUT /burgers/:id', function () {
    it('update an existing burger', async function () {
      sinon.stub(burgerModel, 'updateById').resolves({ ...dataToUpdate, id: 3 });

      const result = await burgerService.updateById(1, dataToUpdate);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal({ ...dataToUpdate, id: 3 });
    });

    it('cannot update a burger with an invalid id', async function () {
      const result = await burgerService.updateById(99, dataToUpdate);

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Burger not found');
    });

    it('cannot update a burger with an invalid name', async function () {
      const result = await burgerService.updateById(1, { name: 'Burg' });

      expect(result.type).to.be.equal('INVALID_DATA');
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('cannot update a burger without a name', async function () {
      const result = await burgerService.updateById(1, {});

      expect(result.type).to.be.equal('BAD_REQUEST');
      expect(result.message).to.be.equal('"name" is required');
    });
  });

  describe('DELETE /burgers/:id', function () {
    it('delete a burger', async function () {
      sinon.stub(burgerModel, 'deleteById').resolves(1);

      const result = await burgerService.deleteById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal(1);
    });

    it('cannot delete a burger with an invalid id', async function () {
      const result = await burgerService.deleteById(99);

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal('Burger not found');
    });
  });
});

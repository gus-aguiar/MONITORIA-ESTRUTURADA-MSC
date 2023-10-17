const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { burgerController } = require('../src/controllers');
const { burgerService } = require('../src/services');

const { expect } = chai;
chai.use(sinonChai);

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

const NOT_FOUND = 'Burger not found';

describe('burgerModel', function () {
  let req;
  let res;

  beforeEach(function () {
    req = {};
    res = {
      status: sinon.stub().returns(),
      json: sinon.stub().returns(),
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('GET /burgers', function () {
    it('get all burgers successfully', async function () {
      sinon
        .stub(burgerService, 'getAll')
        .resolves({
          type: null,
          message: burgers,
        });

      await burgerController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(burgers);
    });
  });

  describe('GET /burgers/:id', function () {
    it('get a burger by id', async function () {
      req.params = { id: 1 };

      sinon
        .stub(burgerService, 'getById')
        .resolves({
          type: null,
          message: burgers[0],
        });

      await burgerController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(burgers[0]);
    });

    it('cannot get a burger with an invalid id', async function () {
      req.params = { id: 99 };

      sinon
        .stub(burgerService, 'getById')
        .resolves({
          type: 'NOT_FOUND',
          message: NOT_FOUND,
        });

      await burgerController.getById(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });

  describe('PUT /burgers', function () {
    it('create a new burger', async function () {
      req.body = newBurger;

      sinon
        .stub(burgerService, 'insert')
        .resolves({
          type: null,
          message: { ...newBurger, id: 4 },
        });

      await burgerController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ ...newBurger, id: 4 });
    });

    it('cannot create a burger with an invalid name', async function () {
      req.body = { name: 'Burg' };

      sinon
        .stub(burgerService, 'insert')
        .resolves({
          type: 'INVALID_DATA',
          message: '"name" length must be at least 5 characters long',
        });

      await burgerController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('cannot create a burger without a name', async function () {
      req.body = {};

      sinon
        .stub(burgerService, 'insert')
        .resolves({
          type: 'BAD_REQUEST',
          message: '"name" is required',
        });

      await burgerController.insert(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });

  describe('PUT /burgers/:id', function () {
    it('update an existing burger', async function () {
      req.params = { id: 1 };
      req.body = dataToUpdate;

      sinon
        .stub(burgerService, 'updateById')
        .resolves({
          type: null,
          message: { ...dataToUpdate, id: 3 },
        });

      await burgerController.updateById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ ...dataToUpdate, id: 3 });
    });

    it('cannot update a burger with an invalid id', async function () {
      req.params = { id: 99 };
      req.body = dataToUpdate;

      sinon
        .stub(burgerService, 'updateById')
        .resolves({
          type: 'NOT_FOUND',
          message: NOT_FOUND,
        });

      await burgerController.updateById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });

  describe('DELETE /burgers/:id', function () {
    it('delete a burger', async function () {
      req.params = { id: 1 };

      sinon
        .stub(burgerService, 'deleteById')
        .resolves({ type: null });

      await burgerController.deleteById(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('cannot delete a burger with an invalid id', async function () {
      req.params = { id: 99 };

      sinon
        .stub(burgerService, 'deleteById')
        .resolves({
          type: 'NOT_FOUND',
          message: NOT_FOUND,
        });

      await burgerController.deleteById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });
});

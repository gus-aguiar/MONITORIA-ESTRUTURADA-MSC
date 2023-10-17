const sinon = require('sinon');
const { expect } = require('chai');
const conn = require('../src/model/connection');
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

describe('burgerModel', function () {
  // Redefine os mocks após cada teste
  afterEach(function () {
    sinon.restore();
  });

  it('get all burgers successfully', async function () {
    // ARRANGE
    sinon.stub(conn, 'execute').resolves([burgers]);
    // ACT
    const result = await burgerModel.getAll();
    // ASSERTION
    expect(result).to.be.deep.equal(burgers);
  });

  it('get a burger by id', async function () {
    // ARRANGE
    const burger1 = burgers[0];
    sinon.stub(conn, 'execute').resolves([[burger1]]);
    // ACT
    const result = await burgerModel.getById(1);
    // ASSERTION
    expect(result).to.be.deep.equal(burger1);
  });

  it('create a new burger', async function () {
    // ARRANGE
    sinon.stub(conn, 'execute').resolves([{ insertId: 4 }]);
    // ACT
    const result = await burgerModel.insert(newBurger);
    // ASSERTION
    expect(result).to.be.deep.equal({ ...newBurger, id: 4 });
  });

  it('update an existing burger', async function () {
    // ARRANGE
    sinon.stub(conn, 'execute').resolves({ ...dataToUpdate, id: 3 });
    // ACT
    const result = await burgerModel.updateById(dataToUpdate);
    // ASSERTION
    expect(result).to.be.deep.equal({ ...dataToUpdate, id: 3 });
  });

  it('delete a burger', async function () {
    // ARRANGE
    sinon.stub(conn, 'execute').resolves([{ affectedRow: 1 }]);
    // ACT
    const result = await burgerModel.deleteById(1);
    // ASSERTION
    expect(result).to.be.equal(1);
  });
});

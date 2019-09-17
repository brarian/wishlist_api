const expect = require('chai').expect;
const db = require('../queries');
import app from '../index';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
describe('queries', () => {
  describe(`db.getItems`, () => {
    it(`should return all items from wishlist_item table`, () => {});
  });
});

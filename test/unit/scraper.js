const {expect} = require('../test');
const Scraper = require('./../../src/cron/scraper');

const FILE = 'users-test.json';

const scraper = new Scraper(FILE);
const fs = require('fs').promises;

describe('Scraper', function() {
  beforeEach(async function () {
    try {
      await fs.unlink(FILE);
    } catch (e) {}
  });

  describe('#doJob', function() {
    it('should scrap users and save to file', async function() {
      await scraper.doJob();

      let file = await fs.readFile(FILE);
      expect(file).to.be.not.null;
      let parsed = JSON.parse(file);
      expect(parsed.lastPage).to.equal(1);

      await scraper.doJob();

      file = await fs.readFile(FILE);
      expect(file).to.be.not.null;
      parsed = JSON.parse(file);
      expect(parsed.lastPage).to.equal(2);
    });
  });
});

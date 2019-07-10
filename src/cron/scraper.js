const regres = require('../services/regres');
const fs = require('fs').promises;

class Scraper {
  constructor (filename) {
    this.filename = filename;
  }
  async doJob() {
    console.log('Scrap job start');

    const data = await this.getStoredData();
    data.lastPage = data.lastPage + 1;
    const users = await regres.getUsers(data.lastPage);

    data.users = data.users.concat(users);
    await this.storeData(data);
    console.log(`Appended ${users.length} users`);
    console.log('Scrap job finished');
  }

  async getStoredData() {
    try {
      var data = await fs.readFile(this.filename);
      data = JSON.parse(data);
    } catch (e) {
      data = {
        lastPage: 0,
        users: []
      };
    }

    return data;
  }

  async storeData(data) {
    await fs.writeFile(this.filename, JSON.stringify(data));
  }

}

module.exports = Scraper;
const scheduler = require('node-schedule');
const Scraper = require('./../src/cron/scraper');
const scraper = new Scraper('users.json');


scheduler.scheduleJob('*/1 * * * *', () => {
  scraper.doJob().then(()=>{
  }).catch(console.error);
});
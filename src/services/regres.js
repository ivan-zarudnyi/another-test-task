const _ = require('lodash');
const request = require('request-promise');
const API_URL = 'https://reqres.in/api';

class RegresService {

  async getUser(id) {
    return await makeRequest('GET', `users/${id}`)
  }
  async getUsers(page) {
    return await makeRequest('GET', `users`, {page})
  }
}

async function makeRequest(method, endpoint, params) {
  params = {
    method: method,
    uri: `${API_URL}/${endpoint} `,
    json: true
  };
  if (_.isObject(params)) {
    if (method != 'GET') {
      params.qs = params
    } else {
      params.body = params;
    }
  }
  const result = await request(params);

  return result.data;
}


module.exports = new RegresService();
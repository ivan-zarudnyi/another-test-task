const AbstractController = require('./AbstractController');
const regres = require('../services/regres');
const storage = require('../services/storage');

class UsersController extends AbstractController {

  async item(req, res) {
    const id = req.params.userId;
    const user = await regres.getUser(id);
    res.json(user);
  }

  async avatar(req, res) {
    const id = req.params.userId;
    const user = await regres.getUser(id);
    if (!user) {
      this.renderError(res, {code: 400, message: 'User not found'})
    }

    let file = await storage.getFile(user.id);

    if (file == null) {
      file = await storage.storeByUrl(user.id, user.avatar);
    }
    res.json(Buffer.from(file, 'binary').toString('base64'));
  }

  async deleteAvatar(req, res) {
    await storage.remove(req.params.userId);
    res.json({message: 'ok'});
  }

}

module.exports = UsersController;
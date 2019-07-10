const _ = require('lodash');

class AbstractController {
  action(method) {
    if (!this[method]) {
      throw new Error(`Method ${method} not found in controller`);
    }
    const params = [...arguments];
    params.splice(0, 1);

    return (req, res, next) => {
      this[method](req, res, ...params).then(() => {
      }).catch(err => {
        app.logger.error(err);
        next(err);
      });
    };
  }

  renderError(res, err) {
    res.status(_.get(err, 'status') || 400);
    res.json(err);
  }
}

module.exports = AbstractController;
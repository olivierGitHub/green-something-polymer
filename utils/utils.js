var jwt = require('jsonwebtoken');
var config = require('./jwtConfig');

var middlewares = {
    verifyToken : function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.status(403).send('Failed to authenticate token.');
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send('No token provided.');
    }
  }
};

module.exports = middlewares;
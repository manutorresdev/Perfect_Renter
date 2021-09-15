const getUser = require('./getUser');
const recoverUserPass = require('./recoverUserPass');
const newUser = require('./newUser');
const loginUser = require('./loginUser');
const passUserRecover = require('./passUserRecover');
const editUserPass = require('./editUserPass');
const validateUser = require('./validateUser');

module.exports = {
  recoverUserPass,
  newUser,
  getUser,
  loginUser,
  passUserRecover,
  editUserPass,
  validateUser,
};

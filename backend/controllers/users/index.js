const getUser = require('./getUser');
const recoverUserPass = require('./recoverUserPass');
const newUser = require('./newUser');
const loginUser = require('./loginUser');
const passUserRecover = require('./passUserRecover');
const editUserPass = require('./editUserPass');
const validateUser = require('./validateUser');
const deleteUser = require('./deleteUser');
const listUsers = require('./listUsers');
const editUser = require('./editUser');
const contactUser = require('./contactUser');
const listBookedProperties = require('./listBookedProperties');
const listUserVotes = require('./listUserVotes');

module.exports = {
  recoverUserPass,
  newUser,
  getUser,
  loginUser,
  passUserRecover,
  editUserPass,
  validateUser,
  deleteUser,
  listUsers,
  editUser,
  contactUser,
  listBookedProperties,
  listUserVotes,
};

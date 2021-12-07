
const to = require('../utils/to');
const uuidv1 = require('uuid/v1');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const models = require('../model');
var user = models.user;
exports.register = async (req, res) => {
  let salt, hash;
  let [err, newUser] = await to(
    user.findOne({
      where: Sequelize.or({ email: req.body.email }, { _id: req.body.user_id }),
      attributes: ['name', '_id', 'email'],
    })
  );

  [err, salt] = await to(bcrypt.genSalt(10));
  [err, hash] = await to(bcrypt.hash(req.body.password, salt));
  const _id = await uuidv1();
  if (err) return res.sendError(err);
  if (newUser) return res.sendError(null, 'User already exists', 409);
  [err, newUser] = await to(user.create({_id, ...req.body, password:hash }));
  if (err && err.original && err.original.code === 'ER_DUP_ENTRY')
    return res.sendError(null, 'User data exists', 409);
  else if (err) return res.sendError(err);

  // const regLink = {
  //   name: newUser.name,
  //   token: password,
  //   toEmail: newUser.email,
  // };
  // let mailData, resp;
  // [err, resp] = await to(
  //   fetch(endpoints.mail + '/send/reglink', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: mailerConfig.key,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(regLink),
  //   })
  // );
  // if (err) return res.sendSuccess(null, 'User registered. Mail not sent');
  // [err, mailData] = await to(resp.json());
  // if (err) return res.sendSuccess(null, 'User registered. Mail not sent');
  console.log({ register: newUser });
  return res.sendSuccess(newUser, 'User registered.');

};
exports.login = async (req, res) => {
  let err, userData, isMatch;
  [err, userData] = await to(
    user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: ['password', '_id', 'role', 'name', 'email'],
    })
  );
  if (err) return res.sendError(err);
  if (!userData) return res.sendError(null, 'Incorrect email or password', 401);
  [err, isMatch] = await to(
    bcrypt.compare(req.body.password, userData.password)
  );
  if (err) return res.sendError();
  if (userData.type === 0 || !isMatch)
    return res.sendError(null, 'Incorrect email or password', 401);
  userData.password = undefined;
  delete userData.password;
  req.session.key = userData;
  req.session.save(() => {
    res.sendSuccess(userData);
  });
};

exports.logout = (req, res) => {
  if (req.session.key)
    req.session.destroy(() => {
      res.sendSuccess(null, 'Logged out');
    });
  else res.sendSuccess(null, 'Logged out');
};

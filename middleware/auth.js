const jwt = require('jsonwebtoken');
const Member = require('../model/member');
const Baker = require('../model/baker');

const bakerAuth = async function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.send('Please authenticate');
  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
  const baker = await Baker.findOne({
    _id: tokenObj._id,
    'token.token': tokenObj._id,
  });
  if (!baker) return res.send('No baker found');
  req.baker = baker;
  req.token = token;
  next();
};

const memberAuth = async function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.send('Please authenticate');
  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
  const member = await Member.findOne({
    _id: tokenObj._id,
    'token.token': tokenObj._id,
  });
  if (!member) return res.send('No member found');
  req.member = member;
  req.token = token;
  next();
};

module.exports = { bakerAuth, memberAuth };

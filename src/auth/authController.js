'use strict';

const { authenticate } = require('./authService');

async function login(req, res) {
  try {
    const user = await authenticate(req.body.username, req.body.password);

    req.session.authUser = user;

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Incorrect username or password!' });
  }
}

function logout(req, res) {
  delete req.session.authUser;

  res.sendStatus(200);
}

module.exports = {
  login,
  logout,
};

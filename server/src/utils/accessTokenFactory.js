const jwt = require("jsonwebtoken");

exports.generate = (payload) => {
  const key = process.env.ACCESS_TOKEN_KEY;
  const expire = process.env.ACCESS_TOKEN_EXPIRES;

  return {
    accessToken: jwt.sign(payload, key, { expiresIn: expire }),
  };
};

exports.verifyAccessToken = (token) => {
  const key = process.env.ACCESS_TOKEN_KEY;

  return jwt.verify(token, key);
};

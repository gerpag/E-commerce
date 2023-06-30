const jsonwebtoken = require("jsonwebtoken");
const responseHandler = require("../handlers/response.handler");
const { Users } = require("../models");
require("dotenv").config();

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) return responseHandler.unauthorize(res);

  const user = await Users.findByPk(tokenDecoded.data);

  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

module.exports = { auth, tokenDecode };

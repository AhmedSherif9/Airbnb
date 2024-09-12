import jwt from "jsonwebtoken";

const validateJWT = (request, response, next) => {
  const { token } = request.signedCookies;
  if (!token) {
    response.status(500).send("Not Logged In");
    return;
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      response.status(500).send("Token is invalid!");
      return;
    }
    if (!payload) {
      response.status(500).send("Token is empty!");
      return;
    }
    response.locals.JWTData = payload;
    next();
  });
};

export default validateJWT;
//kolo shaghal tamam mgarab kolo

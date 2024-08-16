const basicAuth = require("express-basic-auth");

const basicAuthAutorizer = (username, password) => {
  const userMatches = basicAuth.safeCompare(
    username,
    process.env.SWAGGER_UI_USERNAME
  );
  const passwordMatches = basicAuth.safeCompare(
    password,
    process.env.SWAGGER_UI_PASSWORD
  );

  return userMatches & passwordMatches;
};

const getUnauthorizedResponse = (req) => {
  return req.auth
    ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
    : "Please provide credentials to Access Swagger UI";
};

exports.basicAuth = basicAuth({
  authorizer: basicAuthAutorizer,
  unauthorizedResponse: getUnauthorizedResponse,
  challenge: true,
});

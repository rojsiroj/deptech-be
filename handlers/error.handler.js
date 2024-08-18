module.exports = (err, req, res, next) => {
  console.log(err);
  console.log(err.message);

  let status = err.status || 500;
  let message = err.message || "Internal server error";

  switch (err.message) {
    case "jwt expired":
      status = 401;
      message = "Token expired";
      break;
    case "Please upload only images.":
      status = 400;
      message = err.message;
      break;
    default:
      status = 500;
      message = "Internal server error";
      break;
  }

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "Invalid Input":
    case "Email is required":
    case "Password is required":
      status = 400;
      message = err.name;
      break;
    case "Invalid email/password":
    case "Invalid credencial":
      status = 401;
      message = err.name;
      break;
    case "Token not found":
    case "Invalid token":
    case "User in token not found":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;
    case "Token must Bearer type":
      status = 401;
      message = "Token must Bearer type";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "Data not found":
    case "Hero not found":
      status = 404;
      message = err.name;
      break;
  }
  res.status(status).json({ message, data: null });
};

module.exports = {
  host: `${process.env.API_PROTOCOL}://${process.env.API_HOST}`,
  port: process.env.API_PORT,
  swagger: {
    host: `${process.env.API_HOST}:${process.env.API_PORT}`,
    protocol: [process.env.API_PROTOCOL],
  },
};

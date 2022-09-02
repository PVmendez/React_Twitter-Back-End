const tweetsRouter = require("./tweetsRoutes");
const usersRoutes = require("./usersRoutes");

module.exports = (app) => {
  app.use(tweetsRouter);
  app.use(usersRoutes);
};

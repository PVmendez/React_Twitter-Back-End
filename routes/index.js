const tweetsRouter = require("./tweetsRoutes");
const usersRoutes = require("./usersRoutes");
const authRoutes = require("./authRoutes");

module.exports = (app) => {
  app.use(tweetsRouter);
  app.use(usersRoutes);
  app.use(authRoutes);
};

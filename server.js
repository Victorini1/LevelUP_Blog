const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const database = require("./models");
const sequelize = require("./config/connection");
const helpers = require("./utils/helper")

const app = express();
const PORT = process.env.PORT || 3001;


app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')
app.set('views', './views')

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(express.json())

app.use(session(sess))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is listenin on port ${PORT}`))
});
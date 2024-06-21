// Const and dependencies set up
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers'); 
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequilize')(session.Store);

// Sequelize config and session key string 
const app = express();
const PORT = process.env.PORT || 3001; 

//Set up handlebars.js 
const hbs = exphbs.create({helpers});

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    maxAge: 300000,
    resave: false,
    sameSite:"strict",
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};



app.use(session(sess));

//Template to use 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const csv = require('csv-parser');
const path = require('path');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);

const app = express();
app.use(express.static(path.join(__dirname, 'app')));

//DB
const db = require('./config/db').MongoURI

//Conectar Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB conectado...'))
    .catch(err => console.log(err));
var connection = mongoose.connection;

//Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: connection
    })
}));

//Connect Flash
app.use(flash());

//Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//ROUTES

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html');
  });
//app.get('/', (req, res) => res.send('Hello World!'));
app.use('/escenario', require('./routes/escenario'));
app.use('/co2', require('./routes/co2'));
app.use('/emision', require('./routes/emision'));

//Localhost puerto (levantar server)
const port = 3000;
app.listen(port, () => console.log(`Express app running on port ${port}!`));
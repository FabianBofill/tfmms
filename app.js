const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);





const app = express();

//DB
const db = require('./config/db').MongoURI
//Conectar Mongo
mongoose.connect(db, {useNewUrlParser:true})
.then(()=>console.log('MongoDB conectado...'))
.catch(err => console.log(err));
var connection = mongoose.connection;

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store   : new MongoStore({
      mongooseConnection: connection
    })
  }));

  //Connect Flash
app.use(flash());

//Variables globales
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
});

//ROUTES

//Localhost puerto (levantar server)
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Express app running on port ${port}!`));
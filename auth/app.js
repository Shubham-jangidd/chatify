const express = require('express');
const expressLayout = require('express-ejs-layouts')
const app = express();
const mongoose= require('mongoose');
const flash = require('connect-flash')
const session = require('express-session')

// const db = require('./config/keys').MongoURI

mongoose.connect("mongodb://localhost:27017/auth",{ useNewUrlParser: true , useUnifiedTopology: true })
 .then(()=>console.log('mongodb connected'));
 // .catch(err =>console.log(err));


//ejs
app.use(expressLayout);
app.set('view engine','ejs');

// bodyparser

app.use(express.urlencoded({ extended:false }));

// express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// connect-flsh
app.use(flash())

// global var
app.use((req, res, next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    next();
});


//routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))


const PORT =  5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
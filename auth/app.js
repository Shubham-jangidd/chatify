const express = require('express');
const expressLayout = require('express-ejs-layouts')
const app = express();
const mongoose= require('mongoose');
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport'); 

// creating a socket.io server
// listen all the incomming events

const io = require('socket.io')(8000, {
  cors: {
    origin: '*',
  }
});

//chatify-start

var users = {};

// io.on is an sockect.io instance which will listen all the socket connection 

io.on('connection', socket=>{

  
  //socket.on is taking an event and will manage a perticular connection
  socket.on("new-user-joined",(username)=>{
    users[socket.id] = username;
    console.log(users);
    // broadcast will emmit the message to all the user except the user who joined
    socket.broadcast.emit('user-connected',username);
    io.emit("user-list",users);
  });


  socket.on("disconnect",()=>{
    socket.broadcast.emit('user-disconnected',user=users[socket.id]); 
    delete users[socket.id];
    io.emit("user-list",users);
      });


  //if some send messege boradcast it 
  socket.on('message',(data)=>{ 
    socket.broadcast.emit("message",{user:data.user , msg:data.msg})
  }); 

});

//chatify-end


// pasport config

require('./config/passport')(passport);


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


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// connect-flsh
app.use(flash())

// global var
app.use((req, res, next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();

});


//routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

app.use(express.static('static'));
// app.use('/chatify',require('./routes/style'))

app.get('/activeUser', function (req, res) {
  res.json({username: req.user.name})
})



const PORT =  5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
// const io = require('socket.io')(8000)

const io = require('socket.io')(8000, {
  cors: {
    origin: '*',
  }
});

// httpServer.listen(8000);

var users = {};

io.on('connection', socket=>{

	socket.on("new-user-joined",(username)=>{
		users[socket.id] = username;
		console.log(users);
		socket.broadcast.emit('user-connected',username);
		io.emit("user-list",users);
	});



	socket.on("disconnect",()=>{
		socket.broadcast.emit('user-disconnected',user=users[socket.id]); 
		delete users[socket.id];
		io.emit("user-list",users);
			});
	
	socket.on('message',(data)=>{ 
		socket.broadcast.emit("message",{user:data.user , msg:data.msg})
	}); 

});
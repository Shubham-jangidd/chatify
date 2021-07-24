
const socket = io('http://192.168.0.112:8000');
 // const mongoose = require('mongoose');
 // const User = require('../models/User')


// import { io } from "socket.io-client";

// const URL = "http://localhost:3000";
// const socket = io(URL, { autoConnect: false });

// export default socket;

// const form = document.getElementById('send-contaniner');
// const messageInput = document.getElementById('messageInp');
// var audio = new Audio('tone.mp3');
var username;
var chat=document.querySelector(".chat")
var users_list=document.querySelector(".users-list")
var users_count=document.querySelector(".users-count")
var msg_snd=document.querySelector("#user-send");
var user_msg=document.querySelector("#user-msg");
var input = document.getElementById("user-msg");


// const append = (message,)=>{
// 	// console.log(messageelement);
// 	messageelement.classList.add(position);
// 	messagechat.append(messageelement);
// 	if(position == 'left'){
// 	audio.play()
// 	}
// }

// app.get('/auth?search=',function(req,res){
// var search_key = req.param('search');
//     Ebook.find({name: search_key})
//        .then(User => res.json(User))
//        .catch(err => res.status(404).json({ success: false }));
//     });


// 
// User.findOne({name})
//  	.then(user =>{
//  		if(user){

//  		console.log('ready') 
// }});	


// do{
// 	username=prompt("Enter your name");
// }while(!username); 


let jsondata;

// fetch("/activeUser").then(
// 	function(u){
// 		console.log(u);
// 		console.log(u.json());
// 		return u.json();
// 	}).then(
// 		function(json){
// 			jsondata=json;
// 		}
// 	)

// fetch("/activeUser").then(
// 	function(u){
// 		console.log(u);
// 		// console.log(u);
// 		// console.log(u.json());
// 		jsondata = u.json();
// 		// return u.json();
// 	})

// // console.log(jsondata);

// var obj = JSON.parse(jsondata);

// username = obj.username;

// console.log(username);

// fetch("/activeUser").then(res => res.json()).then(out =>
// 	console.log('checkoutthis json', out)).catch(err => throw err);
let abc;
async function myDisplay(){


abc = await fetch('/activeUser')
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log("printing muy json");
       jsondata = myJson.username;
        console.log(jsondata);

        console.log("printing after")
    });

    console.log("printing out of fetch")



username = jsondata;




// console.log("I will Print before User");

// const response = fetch('/activeUser')
// const data = response.json()
// console.log(data)
// // const ans = request();

// console.log("I will Print after User");





socket.emit("new-user-joined", username);

// user joined

socket.on('user-connected',(socket_name)=>{

	userJoinLeft(socket_name,'joined');
	// append(`${name} joined the chat`, 'center')
	// scrollToBottom()

})

// user left the chat

socket.on('user-disconnected',(user)=>{
	userJoinLeft(user,'left')
})
// socket.on('receive', data=>{

// 	append(`${data.name}: ${data.message}`)
// 	scrollToBottom()
// })

// socket.on('left', name=>{

// 	append(`${name} left the chat`,'center')
	// scrollToBottom()
// })





// user to show the no of the login users
// here user_list is user-list class 
// users is from backend app.js

socket.on('user-list',(users)=>{

    users_list.innerHTML="";
    users_arr=Object.values(users); 
    for(var i = 0 ; i<users_arr.length ; i++){
      let p=document.createElement('p');
      p.innerText=users_arr[i];
      users_list.appendChild(p);
  }
  users_count.innerText=users_arr.length;
})




// meathod to append login user message into right in the chat
// where user_msg = #user-msg id of input tag

msg_snd.addEventListener('click',()=>{

	let data={
		user: username,
		msg: user_msg.value
	}
	if (user_msg.value!=''){
		appendMessage(data,'right');
		socket.emit('message',data);
		user_msg.value='';
	}
})




// meathod to append other user message into left in the chat

socket.on('message',(data)=>{
	appendMessage(data,'left');
})






//   function for user join and left the chat

function userJoinLeft(name,status){
	let div=document.createElement("div");
	div.classList.add('user-joined');
	let content=`<p><b> ${name}</b> ${status} the chat</p>`;
	div.innerHTML=content;
	chat.appendChild(div);
	scrollToBottom()
}




// function to append values in to div with class message and status
// inside a div with class chat

function appendMessage(data,status){
	let div=document.createElement('div');
	div.classList.add('message1',status);
	let content=`
	<h5 class="sender">${data.user}</h5>
	<p class="allmessage">${data.msg}</p>
	`;
	div.innerHTML=content;
	chat.appendChild(div);
	scrollToBottom()
}



//button

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("user-send").click();
  }
});

// function to scroll bottom in chat

function scrollToBottom() {
	chat.scrollTop = chat.scrollHeight
}

}

myDisplay();


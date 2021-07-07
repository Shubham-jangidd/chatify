
const socket = io('http://192.168.0.112:8000');
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

// const append = (message,)=>{
// 	// console.log(messageelement);
// 	messageelement.classList.add(position);
// 	messagechat.append(messageelement);
// 	if(position == 'left'){
// 	audio.play()
// 	}
// }


// 

do{
  username=prompt("Enter your name");
}while(!username); 

socket.emit("new-user-joined", username);



socket.on('user-connected',(socket_name)=>{

	userJoinLeft(socket_name,'joined');
	// append(`${name} joined the chat`, 'center')
	// scrollToBottom()

})

// socket.on('receive', data=>{

// 	append(`${data.name}: ${data.message}`)
// 	scrollToBottom()
// })

// socket.on('left', name=>{

// 	append(`${name} left the chat`,'center')
	// scrollToBottom()
// })

function userJoinLeft(name,status){
	let div=document.createElement("div");
	div.classList.add('user-joined');
	let content=`<p><b> ${name}</b> ${status} the chat</p>`;
	div.innerHTML=content;
	chat.appendChild(div);
	scrollToBottom()
}

socket.on('user-disconnected',(user)=>{
userJoinLeft(user,'left')
})

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

function appendMessage(data,status){
let div=document.createElement('div');
div.classList.add('message1',status);
let content=`
<h5>${data.user}</h5>
<p>${data.msg}</p>
`;
div.innerHTML=content;
chat.appendChild(div);
scrollToBottom()
}

socket.on('message',(data)=>{
	appendMessage(data,'left');
})

function scrollToBottom() {
    chat.scrollTop = chat.scrollHeight
}

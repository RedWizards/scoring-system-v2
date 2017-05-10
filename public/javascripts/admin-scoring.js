var socket = io.connect('http://localhost:3000');

function init(){
	//call this line of on ng-init of admin-judging app
	socket.emit('admin-connection', "This is admin requesting to connect and gain access to server");
}

init();
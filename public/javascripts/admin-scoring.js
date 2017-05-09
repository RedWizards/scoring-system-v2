var io = require('socket.io')(3000);
var judging;

function startJudging(){
	judging = io
		.of('/judging')
		.on('connection', function (socket) {
			console.log('New Connection: ', socket.id);
		});
}
module.exports = (io) => {
	var judges = [];

	var judge = io.of('/judges')
		.on('connection', (socket) => {

			var is_connected = false;

			//check if IP address is in the list of connected devices
			judges.forEach((judge) => {
				if(socket.request.connection.remoteAddress == judge.ip_address){
					judge.socket_id = socket.id;
					judge.ip_address = socket.request.connection.remoteAddress;
					is_connected = true;
				}
			});

			if(is_connected){
				//give this judge's registered id
				
			}else{
				judges.push({
					socket_id: socket.id,
					ip_address: socket.request.connection.remoteAddress
				});
			}

			console.log('A Judge Connected: Waiting for the judging to be officially opened.');
		})
		.on('judging-request', (data) => {
			console.log(data);
		});

	var admin = io.of('/admins')
		.on('connection', (socket) => {

			//Judging is opened by admin
			socket.on('judging-opened', function(){
				judge.emit('judging-opened');
			});

			console.log('An Admin is Connected: Requesting to gain full access to server.');
		});

	return;
}

module.exports = (io) => {
	var admins = [];
	var judges = [];

	io.on('connection', (socket) => {

		var is_connected = false;

		//Client is the system administrator
		socket.on('admin-connection', function(data){

			judges.forEach((judge) => {
				if(socket.request.connection.remoteAddress == judge.ip_address){
					judges.splice(judge, 1);
				}
			});

			admins.push({
				socket_id: socket.id,
				ip_address: socket.request.connection.remoteAddress
			});

			console.log(data);
		});

		//Client is judge
		socket.on('judge-connection', function(data){

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

				admins.forEach((admin) => {
					if(socket.request.connection.remoteAddress == admin.ip_address){
						admins.splice(admin, 1);
					}
				});

				judges.push({
					socket_id: socket.id,
					ip_address: socket.request.connection.remoteAddress
				});
			}

			console.log('Judge Connected, awaiting for confirmation');
		});

		//Judging is opened by admin
		socket.on('judging-opened', function(){
			judges.forEach(function(judge){
				socket.broadcast.to(judge.socket_id).emit('judging-opened');
			});
		});
	});

	return;
}

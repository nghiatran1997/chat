var io = require('socket.io');

module.exports = function(server){
	io(server).on("connection", (socket)=> {
		console.log('co nguoi dang nhap');
		socket.on('disconnect', function() {
			console.log('da ngat ket noi');
		});
	});

}
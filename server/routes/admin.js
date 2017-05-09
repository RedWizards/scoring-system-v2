module.exports = (io) => {
	var express = require('express');
	var router = express.Router();

	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('admin');
	});

	io.on('connection', (socket) => {
		console.log('New Connection: ', socket.id);
	});

	return router;
}

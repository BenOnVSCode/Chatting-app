require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')
const PORT = process.env.PORT || 9000;
const app = express()
const http = require('http')
const socketIO = require('socket.io')
const user = require('./routes/user')
const server = http.Server(app);
const io = socketIO(server, {
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST"],
	  credentials: true
	}
  });

app.use(express.json());
app.use('/', user)
io.on("connection", socket => { 
	socket.on('join-room', room => {
		socket.join(room)
	})
	socket.on('send-message', (message, room) => {
		console.log(message)
		if(room) {
			socket.to(room).emit('recieve-message', message)
		}
	})
	
});
mongoose.connect(process.env.DATABASE_URL,{ useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true  }, () => {
	console.log('Mongo connected')

})
server.listen(PORT, () => {
	console.log('server is running')
});


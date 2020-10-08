import { Rooms, UserSocket } from "./interfaces/interfaces";
import express = require("express");
import http = require("http");
import chalk = require("chalk");
const app: express.Application = express();
const server: http.Server = http.createServer(app);
import socketIO = require("socket.io");
const io: socketIO.Server = socketIO.listen(server);
const PORT = 1488;
const connections: UserSocket[] = [];
const rooms: Rooms = {};
app.get("/", (req: express.Request, res: express.Response) => {
	res.end("<h1>Hello bruh</h1>");
});

server.listen(PORT, () => {
	console.log(
		`Server has been started on ${chalk.rgb(
			93,
			95,
			255
		)("http://localhost:1488")}`
	);
});

io.sockets.on("connection", (socket: UserSocket) => {
	connections.push(socket);
	console.log(`Connected: ${connections.length} sockets connected`);

	socket.on("disconnect", (data) => {
		connections?.splice(connections.indexOf(socket), 1);
		rooms[socket.room!]?.splice(rooms[socket.room!].indexOf(socket), 1);
		console.log(`Disconnected: ${connections.length} sockets connected.`);
		if (rooms[socket.room!].length === 0) {
			delete rooms[socket.room!];
		}
	});
	socket.on("new client", (data: { room: string; name: string }) => {
		socket.name = data.name;
		socket.room = data.room;
		socket.id = Date.now().toString();
		if (socket.room in rooms) {
			rooms[socket.room].push(socket);
		} else {
			rooms[socket.room] = [socket];
		}
	});
});

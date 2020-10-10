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
		if (rooms[socket.room!]?.length === 0) {
			delete rooms[socket.room!];
		}
		io.sockets.emit("send users", {
			usersList: rooms[socket.room!]?.map((user) => ({
				id: user.uid,
				name: user.name,
			})),
		});
		io.sockets.emit("new msg", {
			text: `${socket.name} left chat.`,
			infoId: socket.uid,
		});
	});

	socket.on(
		"new client",
		({ room, name, id }: { room: string; name: string; id: string }) => {
			socket.name = name;
			socket.room = room;
			socket.uid = id;
			if (socket.room in rooms) {
				rooms[socket.room].push(socket);
			} else {
				rooms[socket.room] = [socket];
			}

			/* socket.emit("get id", { idUser: socket.uid }); */
			io.sockets.emit("send users", {
				usersList: rooms[socket.room].map((user) => ({
					id: user.uid,
					name: user.name,
				})),
			});
			io.sockets.emit("new msg", {
				text: `${socket.name} joined to chat.`,
				infoId: socket.uid,
			});
		}
	);

	socket.on("send msg", ({ message }) => {
		console.log(message);
		io.sockets.emit("new msg", {
			senderId: socket.uid,
			senderName: socket.name,
			text: message,
		});
	});
});

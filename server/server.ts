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
		rooms[socket.room!]?.users.splice(
			rooms[socket.room!].users?.indexOf(socket),
			1
		);
		console.log(`Disconnected: ${connections.length} sockets connected.`);
		if (rooms[socket.room!]?.users?.length === 0) {
			delete rooms[socket.room!];
		}
		rooms[socket.room!]?.sockets.emit("send users", {
			usersList: rooms[socket.room!]?.users?.map((user) => ({
				id: user.uid,
				name: user.name,
			})),
		});
		rooms[socket.room!]?.sockets.emit("new msg", {
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
				rooms[socket.room]?.users.push(socket);
			} else {
				rooms[socket.room] = {
					users: [socket],
					sockets: {
						emit: function (event: string, data: any) {
							rooms[socket.room!]?.users.forEach((user: UserSocket) =>
								user.emit(event, data)
							);
						},
					},
				};
			}

			/* socket.emit("get id", { idUser: socket.uid }); */
			rooms[socket.room!]?.sockets.emit("send users", {
				usersList: rooms[socket.room]?.users?.map((user) => ({
					id: user.uid,
					name: user.name,
				})),
			});
			rooms[socket.room!]?.sockets.emit("new msg", {
				text: `${socket.name} joined to chat.`,
				infoId: socket.uid,
			});
		}
	);

	socket.on("send msg", ({ message }) => {
		rooms[socket.room!]?.sockets.emit("new msg", {
			senderId: socket.uid,
			senderName: socket.name,
			text: message,
		});
	});
});

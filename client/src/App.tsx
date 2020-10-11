import React, { useEffect, useState } from "react";
import "./App.sass";
import openSocket from "socket.io-client";
import { UserContext } from "./context";
import { Auth } from "./components/Auth/Auth";
import { Chat } from "./components/Chat/Chat";
let uid;
export const App: React.FC<{}> = () => {
	function auth(port: string, name: string) {
		const temp = openSocket(`https://limitless-castle-98054.herokuapp.com/`);
		setSocket(temp);
		setUsername(name);
		uid = String(Math.random());
		setId(uid);
		configSocket(temp, port, name, uid);
	}
	function configSocket(
		tempSocket: SocketIOClient.Socket,
		port: string,
		name: string,
		id: string
	) {
		tempSocket.emit("new client", { room: port, name, id });
	}
	const [socket, setSocket] = useState<SocketIOClient.Socket>();
	const [username, setUsername] = useState("");
	const [id, setId] = useState("");
	useEffect(() => {
		return () => {
			socket && socket.disconnect();
		};
	}, [socket]);
	return (
		<div className="App">
			{!socket && <Auth onAuth={auth} />}
			{socket && (
				<UserContext.Provider value={{ socket, id, name: username }}>
					<Chat />
				</UserContext.Provider>
			)}
		</div>
	);
};

export default App;

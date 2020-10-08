import React, { useEffect, useState } from "react";
import "./App.sass";
import openSocket from "socket.io-client";
import { Auth } from "./components/Auth/Auth";
// const socket = openSocket("http://localhost:1488");
function App() {
	function auth(port: string, name: string) {
		const temp = openSocket(`http://localhost:1488`);
		console.log(temp);
		setSocket(temp);
		temp.emit("new client", { room: port, name });
	}
	const [socket, setSocket] = useState<SocketIOClient.Socket>();
	useEffect(() => {
		// socket.emit("new client", { msg: "hi" });
		return () => {
			socket && socket.disconnect();
		};
	}, [socket]);
	return (
		<div className="App">
			{!socket && <Auth onAuth={auth} />}
			{socket && <h1>Congratulations!</h1>}
		</div>
	);
}

export default App;

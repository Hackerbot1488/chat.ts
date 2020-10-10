import { createContext } from "react";
import { Socket } from "socket.io-client";
export interface UserContextFields {
	id?: string;
	name?: string;
	socket?: SocketIOClient.Socket;
}
export const UserContext = createContext<UserContextFields>({
	id: "",
	name: "",
	socket: undefined,
});

export interface UserSocket extends SocketIO.Socket {
	name?: string;
	room?: string;
	id?: string;
}
export interface Rooms {
	[key: string]: UserSocket[];
}

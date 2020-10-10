export interface UserSocket extends SocketIO.Socket {
	name?: string;
	room?: string;
	uid?: string;
}
export interface Rooms {
	[key: string]: UserSocket[];
}

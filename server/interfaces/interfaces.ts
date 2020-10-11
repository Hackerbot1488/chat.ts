export interface UserSocket extends SocketIO.Socket {
	name?: string;
	room?: string;
	uid?: string;
}
export interface Rooms {
	[key: string]: {
		users: UserSocket[];
		sockets: {
			emit: (event: string, data: any) => void;
		};
	};
}

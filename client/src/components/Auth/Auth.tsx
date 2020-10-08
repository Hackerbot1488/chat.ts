import React, { ChangeEvent, useState } from "react";
import "./Auth.sass";
interface AuthProps {
	onAuth: (port: string, name: string) => void;
}
export const Auth: React.FC<AuthProps> = ({ onAuth }) => {
	const [room, setRoom] = useState("");
	const [name, setName] = useState("");
	return (
		<div className="auth-form">
			<h3 className="auth-form__header">Awesome chat</h3>
			<input
				className="auth-form__input"
				placeholder="Name"
				value={name}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
			/>
			<input
				className="auth-form__input"
				placeholder="Room"
				value={room}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
				/* onKeyPress={(e: KeyboardEvent<HTMLInputElement>) =>
					(e.key === "Enter" && room.trim() && name.trim()) ??
					onAuth(room, name)
				} */
			/>
			<button
				className="auth-form__button"
				onClick={() => room.trim() && name.trim() && onAuth(room, name)}
			>
				Join
			</button>
		</div>
	);
};

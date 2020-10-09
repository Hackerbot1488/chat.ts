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
			<h1 className="auth-form__header">Awesome chat</h1>
  <div className="auth-form__content">
  <label htmlFor="name">Type your name</label>
			<input
				className="auth-form__input"
   id="name" 
				placeholder="Name"
				value={name}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
			/>
  </div>
  <div className="auth-form__content">
  <label htmlFor="room">Type room number</label>
			<input
				className="auth-form__input"
   id="room" 
				placeholder="Room"
				value={room}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
				/* onKeyPress={(e: KeyboardEvent<HTMLInputElement>) =>
					(e.key === "Enter" && room.trim() && name.trim()) ??
					onAuth(room, name)
				} */
			/>
  </div>
  <div className="auth-form__content">
			<button
				className="auth-form__button"
				onClick={() => room.trim() && name.trim() && onAuth(room, name)}
			>
				Join
			</button>
  </content>
		</div>
	);
};
div>
	);
};

import React, { useContext } from "react";
import { UserContext } from "../../../../context";
import "./Message.sass";
export interface MessageProps {
	message: {
		owner?: string;
		name?: string;
		text: string;
		uid?: string;
	};
}
export const Message: React.FC<MessageProps> = ({ message }) => {
	const { id } = useContext(UserContext);
	return (
		<div
			className={`message ${message.owner ? `message_${message.owner}` : ""}`}
		>
			<div
				className={`message__body ${
					message.owner ? `message__body_${message.owner}` : ""
				}`}
			>
				{message.owner !== "admin" && (
					<span
						className={`message__username ${
							message.owner !== "user" ? "message__username_left" : ""
						}`}
					>
						{message.uid === id ? "You" : message.name}
					</span>
				)}
				<span className="message__text">{message.text}</span>
			</div>
			{/* message.owner !== "admin" && (
				<span className="message__date">{new Date().toLocaleString()}</span>
			) */}
		</div>
	);
};

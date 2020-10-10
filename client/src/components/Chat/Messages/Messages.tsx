import React, { useContext, useEffect, useState } from "react";
import "./Messages.sass";
import { Message } from "./Message/Message";
import { UserContext } from "../../../context";
export interface MessageFields {
	text: string;
	owner: string;
	name?: string;
	visible: boolean;
	uid?: string;
}
export interface SocketMessage {
	senderId?: string;
	senderName?: string;
	text: string;
	infoId: string;
}
export const Messages: React.FC<{}> = () => {
	const { id, name, socket } = useContext(UserContext);
	const [messages, setMessages] = useState<MessageFields[]>([]);
	useEffect(() => {
		socket?.on(
			"new msg",
			({ senderId, senderName, text, infoId }: SocketMessage) => {
				console.log(`${id} ${name} ${senderId}`);
				setMessages((prev: MessageFields[]) => [
					...prev,
					{
						text,
						owner: senderId ? (senderId === id ? "user" : "") : "admin",
						name: senderName,
						visible: infoId === id ? false : true,
						uid: senderId,
					},
				]);
			}
		);
	}, [id, name, socket]);
	return (
		<div className="messages">
			<div className="messages-container">
				{messages.map((message: MessageFields) => {
					if (message.visible) {
						return (
							<div
								key={Math.random()}
								className={`message-wrapper ${
									message.owner === "admin"
										? "message-wrapper_admin"
										: message.owner === "user"
										? "message-wrapper_user"
										: ""
								}`}
							>
								<Message message={message} />
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

import React, { useContext, useEffect, useRef, useState } from "react";
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
	const ref = useRef<HTMLDivElement>(null);
	const firstRender = useRef(true);
	function scrollBottom() {
		ref.current!.scrollTo(0, ref.current!.scrollHeight);
	}
	useEffect(() => {
		if (firstRender.current) {
			socket?.on(
				"new msg",
				({ senderId, senderName, text, infoId }: SocketMessage) => {
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
			firstRender.current = false;
			return;
		}
		scrollBottom();
	}, [id, name, socket, ref, firstRender, scrollBottom]);
	return (
		<div className="messages">
			<div className="messages-container" ref={ref}>
				{messages.map((message: MessageFields) => {
					if (message.visible) {
						return (
							<div
								key={Math.random()}
								onClick={() => scrollBottom()}
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

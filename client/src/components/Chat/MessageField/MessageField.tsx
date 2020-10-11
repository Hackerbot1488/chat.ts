import React, { KeyboardEvent, useContext, useRef, useState } from "react";
import "./MessageField.sass";
import { ReactComponent as SendImage } from "../../../images/send.svg";
import { UserContext } from "../../../context";

export const MessageField: React.FC<{}> = () => {
	const { socket } = useContext(UserContext);
	const [message, setMessage] = useState("");
	const ref = useRef<HTMLDivElement>(null);
	function keyPressHandler(e: KeyboardEvent<HTMLDivElement>) {
		setTimeout(() => {
			setMessage(ref.current?.innerText || "");
		}, 0);
	}
	function sendMessage() {
		if (message.trim()) {
			socket?.emit("send msg", { message });
			setMessage("");
			ref.current!.innerText = "";
		}
	}
	return (
		<div className="message-field">
			<div
				className={`message-field__input ${
					message.trim() ? "" : "message-field__input_empty"
				}`}
				contentEditable
				ref={ref}
				onKeyPress={(e: KeyboardEvent<HTMLDivElement>) => {
					if (e.key === "Enter") {
						e.preventDefault();
						sendMessage();
					}
				}}
				onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
					e.key !== "Enter" && keyPressHandler(e);
				}}
			></div>
			<button className="message-field__button" onClick={() => sendMessage()}>
				<SendImage />
			</button>
		</div>
	);
};

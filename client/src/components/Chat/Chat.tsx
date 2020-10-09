import React from "react";
import { MessageField } from "./MessageField/MessageField";
import { Messages } from "./Messages/Messages";
import { Users } from "./Users/Users";
import "./Chat.sass";
export const Chat: React.FC<{}> = () => {
	return (
		<div className="chat">
			<Users />
			<div className="messages-wrapper">
				<Messages />
				<MessageField />
			</div>
		</div>
	);
};

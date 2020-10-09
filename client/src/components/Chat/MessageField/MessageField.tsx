import React from "react";
import "./MessageField.sass";
import { ReactComponent as SendImage } from "../../../images/send.svg";
export const MessageField: React.FC<{}> = () => {
	return (
		<div className="message-field">
			<textarea
				className="message-field__textarea"
				placeholder="Type your message..."
				rows={4}
			></textarea>
			<button className="message-field__button">
				<SendImage />
			</button>
		</div>
	);
};

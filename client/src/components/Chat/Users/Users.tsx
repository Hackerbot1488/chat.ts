import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context";
import "./Users.sass";
export interface User {
	name: string;
	id: string;
}
export const Users: React.FC<{}> = () => {
	const [users, setUsers] = useState<User[]>([]);
	const { socket } = useContext(UserContext);
	useEffect(() => {
		socket?.on("send users", ({ usersList }: { usersList: User[] }) => {
			setUsers(usersList);
		});
	}, [socket]);
	return (
		<div className="users">
			<h3 className="users__header">Users online: {users?.length}</h3>
			<ul className="users-list">
				{users?.map((user) => {
					return (
						<li className="chat__user" key={Math.random()}>
							{user.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

import React from "react";
import "./Users.sass";
const users = [
	"Mike hadson",
	"Boddy Shmurda",
	"Duck Duglas",
	"Harry Potter",
	"Joey Badass",
	"Ruby Da Cherry",
	"Mike hadson",
	"Boddy Shmurda",
	"Duck Duglas",
	"Harry Potter",
	"Joey Badass",
	"Ruby Da Cherry",
	"Mike hadson",
	"Boddy Shmurda",
	"Duck Duglas",
	"Harry Potter",
	"Joey Badass",
	"Ruby Da Cherry",
];
export const Users: React.FC<{}> = () => {
	return (
		<div className="users">
			<h3 className="users__header">Users online: {users.length}</h3>
			<ul className="users-list">
				{users.map((user) => {
					return <li className="chat__user">{user}</li>;
				})}
			</ul>
		</div>
	);
};

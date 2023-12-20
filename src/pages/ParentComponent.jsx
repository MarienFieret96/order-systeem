import React, { useState } from "react";
import ChildComponent from "../components/ChildComponent";

const ParentComponent = () => {
	const [user, setUser] = useState({
		naam: "harry",
		phone: "0612345678",
	});

	const handleSave = (childData, tempValue) => {
		setUser({
			...user,
			[tempValue]: childData,
		});
	};
	return (
		<div>
			<ChildComponent handleSave={handleSave} phone={user.phone} />

			<h2>{user.naam}</h2>
			<h2>{user.phone}</h2>
		</div>
	);
};

export default ParentComponent;

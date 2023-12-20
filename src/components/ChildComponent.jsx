import React from "react";

const ChildComponent = ({ handleSave, phone }) => {
	return (
		<div>
			<input
				type="text"
				onChange={(e) => handleSave(e.target.value, "phone")}
				value={phone}
			/>
		</div>
	);
};

export default ChildComponent;

import React from "react";

const OptiesView = ({ optie }) => {
	console.log(optie);
	return (
		<div>
			{optie.map((item, index) => {
				return <p>{item}</p>;
			})}
		</div>
	);
};

export default OptiesView;

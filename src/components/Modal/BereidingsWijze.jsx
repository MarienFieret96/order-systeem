import React from "react";

const BereidingsWijze = ({ bereidingsWijze }) => {
	return (
		<>
			<h4>Bereiding</h4>
			{bereidingsWijze?.map((item, index) => {
				const bereiding = Object.entries(item)[0];
				return (
					<p key={index}>
						<span className="capitalize">{bereiding[0]}</span> - {bereiding[1]}
					</p>
				);
			})}
		</>
	);
};

export default BereidingsWijze;

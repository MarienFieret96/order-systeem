import React from "react";

const Wijnen = ({ wijn }) => {
	return (
		<>
			<h4>Wijnen</h4>
			<div className="row">
				{wijn?.map((item, index) => {
					return (
						<p key={index}>
							{index !== 0 && <span>, </span>}
							<span className="capitalize">{item.naam}</span>
						</p>
					);
				})}
			</div>
		</>
	);
};

export default Wijnen;

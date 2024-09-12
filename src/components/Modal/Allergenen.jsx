import React from "react";

const Allergenen = ({ allergenen }) => {
	return (
		<>
			<h4>Allergenen</h4>
			<div className="row">
				{allergenen?.map((item, index) => {
					return (
						<p key={index}>
							{index !== 0 && <span>, </span>}
							<span className="capitalize">{item}</span>
						</p>
					);
				})}
			</div>
		</>
	);
};

export default Allergenen;

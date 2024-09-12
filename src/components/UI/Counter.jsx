import React from "react";
import { MinusIcon, PlusIcon } from "../../assets/svg";

const Counter = ({ count, handleClick, id }) => {
	return (
		<div className="counter">
			<div className="center" onClick={() => handleClick("min", id)}>
				<MinusIcon />
			</div>
			<span>{count}</span>
			<div className="center" onClick={() => handleClick("plus", id)}>
				<PlusIcon />
			</div>
		</div>
	);
};

export default Counter;

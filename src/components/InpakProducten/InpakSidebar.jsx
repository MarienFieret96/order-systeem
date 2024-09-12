import React from "react";
import { ForwardIcon } from "../../assets/svg";

const InpakSidebar = ({
	inpakIndex,
	setInpakIndex,
	setInpakProductStatus,
	inpakProductStatus,
	inpakProducten,
}) => {
	const handleClick = (i) => {
		setInpakIndex(i);
		setInpakProductStatus("read");
	};
	return (
		<div className="sidebar">
			{inpakProducten.map((item, index) => {
				return (
					<div
						key={item._id}
						className={
							inpakIndex === index && inpakProductStatus !== "write"
								? "button active"
								: "button"
						}
						onClick={() => handleClick(index)}
					>
						<h4>{item.naam}</h4>
						<ForwardIcon />
					</div>
				);
			})}
			<div
				className={inpakProductStatus === "write" ? "button active" : "button"}
				onClick={() => setInpakProductStatus("write")}
			>
				<h4>Nieuw product toevoegen</h4>

				<ForwardIcon />
			</div>
		</div>
	);
};

export default InpakSidebar;

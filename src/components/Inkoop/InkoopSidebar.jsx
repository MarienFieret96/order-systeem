import React from "react";
import { ForwardIcon } from "../../assets/svg";

const InkoopSidebar = ({
	inkoopProducten,
	inkoopIndex,
	inkoopProductStatus,
	setInkoopIndex,
	setInkoopProductStatus,
}) => {
	const handleClick = (i) => {
		setInkoopIndex(i);
		setInkoopProductStatus("read");
	};
	return (
		<div className="sidebar">
			{inkoopProducten.map((item, index) => {
				return (
					<div
						key={item._id}
						className={
							inkoopIndex === index &&
							inkoopProductStatus !== "add" &&
							inkoopProductStatus !== "create"
								? "button active"
								: "button"
						}
						onClick={() => handleClick(index)}
					>
						<h4>{item.leverancier}</h4>
						<ForwardIcon />
					</div>
				);
			})}
			<div
				className={inkoopProductStatus === "add" ? "button active" : "button"}
				onClick={() => setInkoopProductStatus("add")}
			>
				<h4>Nieuw product toevoegen</h4>

				<ForwardIcon />
			</div>
			<div
				className={
					inkoopProductStatus === "create" ? "button active" : "button"
				}
				onClick={() => setInkoopProductStatus("create")}
			>
				<h4>Nieuwe leverancier toevoegen</h4>

				<ForwardIcon />
			</div>
		</div>
	);
};

export default InkoopSidebar;

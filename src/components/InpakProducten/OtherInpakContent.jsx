import React from "react";
import { EditIcon } from "../../assets/svg";
import { DateFormatDayMonth } from "../../components";

const OtherInpakContent = ({ data, handleEditClick }) => {
	return (
		<>
			<div className="header grid">
				<h4>datum</h4>
				<h4>t.h.t.</h4>
				<h4>aantal</h4>
				<h4>over</h4>
				<h4>werknemer</h4>
				<h4>wijzigen</h4>
			</div>
			{data.map((item, index) => {
				if (index === 0 || index > 5) return;
				return (
					<div className="grid" key={index}>
						<DateFormatDayMonth datum={item.inpakdatum} />
						<DateFormatDayMonth datum={item.houdbaarheidsdatum} />
						<p>{item.aantal}</p>
						<p>{item.afval}</p>
						<p>{item.werknemer}</p>
						<div className="center" onClick={() => handleEditClick(index)}>
							<EditIcon />
						</div>
					</div>
				);
			})}
		</>
	);
};
export default OtherInpakContent;

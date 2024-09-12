import React from "react";

const DateFormatDayMonth = ({ datum }) => {
	const tempDate = new Date(datum);
	const setTimeOnDateObject = (date) => {
		let day = date.getDate();
		let month = date.getMonth();
		return { day, month };
	};
	const formattedDate = setTimeOnDateObject(tempDate);

	const maanden = [
		"januari",
		"februari",
		"maart",
		"april",
		"mei",
		"juni",
		"juli",
		"augustus",
		"september",
		"oktober",
		"november",
		"december",
	];
	return (
		<p>
			{formattedDate.day} {maanden[formattedDate.month]}
		</p>
	);
};

export default DateFormatDayMonth;

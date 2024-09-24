import React, { useEffect, useState } from "react";

const InpakTable = ({ data }) => {
	const [currentWeek, setCurrentWeek] = useState(0);
	const [tableData, setTableData] = useState([]);
	useEffect(() => {
		function getDateWeek(date) {
			const currentDate = typeof date === "object" ? date : new Date();
			const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
			const daysToNextMonday =
				januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
			const nextMonday = new Date(
				currentDate.getFullYear(),
				0,
				januaryFirst.getDate() + daysToNextMonday,
			);

			return currentDate < nextMonday
				? 52
				: currentDate > nextMonday
				? Math.ceil((currentDate - nextMonday) / (24 * 3600 * 1000) / 7)
				: 1;
		}

		const currentDate = new Date();
		const CurrentWeekNumber = getDateWeek(currentDate);
		setCurrentWeek(CurrentWeekNumber);
		const totalData = [
			{ week: 0, gemaakt: 0, afval: 0 },
			{ week: 1, gemaakt: 0, afval: 0 },
			{ week: 2, gemaakt: 0, afval: 0 },
			{ week: 3, gemaakt: 0, afval: 0 },
			{ week: 4, gemaakt: 0, afval: 0 },
			{ week: 5, gemaakt: 0, afval: 0 },
			{ week: 6, gemaakt: 0, afval: 0 },
			{ week: 7, gemaakt: 0, afval: 0 },
			{ week: 8, gemaakt: 0, afval: 0 },
			{ week: 9, gemaakt: 0, afval: 0 },
			{ week: 10, gemaakt: 0, afval: 0 },
			{ week: 11, gemaakt: 0, afval: 0 },
		];
		data.forEach((item) => {
			let weekDay = getDateWeek(item.inpakdatum);
			if (CurrentWeekNumber - weekDay > 11) return;
			let totalAmount =
				totalData[CurrentWeekNumber - weekDay].gemaakt + Number(item.aantal);
			let totalWaste =
				totalData[CurrentWeekNumber - weekDay].afval + Number(item.afval);
			totalData[CurrentWeekNumber - weekDay] = {
				week: CurrentWeekNumber - weekDay,
				gemaakt: totalAmount,
				afval: totalWaste,
			};
		});
		setTableData(totalData);
	}, []);

	return (
		<div className="inpak-grid">
			<div className="row">
				<h4></h4>
				<h4>Totaal ingepakt</h4>
				<h4>Weggegooid</h4>
			</div>
			{tableData.map((item, index) => {
				return (
					<div className="row" key={index}>
						<h4>Week {currentWeek - item.week}</h4>
						<p>{item.gemaakt} </p>
						<p>{item.afval}</p>
					</div>
				);
			})}
		</div>
	);
};

export default InpakTable;

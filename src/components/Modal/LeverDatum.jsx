import React from "react";

const LeverDatum = ({ leverancier }) => {
	const checkLeverdatum = (bedrijf) => {
		if (bedrijf === "adri") return "Voor 15:00 besteld, volgende dag in huis";
		if (bedrijf === "marien")
			return "Elke dinsdag, donderdag en zaterdag in huis";
		if (bedrijf === "volfood" || bedrijf === "overig") return "";
	};
	const leverdatum = checkLeverdatum(leverancier);

	return (
		<>
			<h4>Leverancier</h4>
			<p>
				<span className="capitalize">{leverancier}</span>
				{leverdatum && <span> - {leverdatum}</span>}
			</p>
		</>
	);
};

export default LeverDatum;

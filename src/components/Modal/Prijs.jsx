import React from "react";
import { formatPrice } from "../../utils/helpers";

const Prijs = ({ prijs }) => {
	const stuksPrijs = prijs.perStuk && !prijs.gemiddeldGewicht;
	return (
		<h2>
			{formatPrice(prijs.prijs)}{" "}
			<span>{!stuksPrijs ? "per 100 gram" : "per stuk"}</span>
		</h2>
	);
};

export default Prijs;

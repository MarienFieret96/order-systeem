import React, { useState } from "react";
import customFetch from "../../utils/customFetch";
import toast from "react-hot-toast";

const CreateNewLeverancier = ({
	setInkoopProductStatus,
	inkoopProducten,
	setInkoopProducten,
}) => {
	const [leverancier, setLeverancier] = useState("");
	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		if (!leverancier) return;
		const newLeverancierObject = {
			leverancier: leverancier,
			producten: [],
		};

		setLoading(true);
		// try {
		// 	const response = await customFetch.post("/inkoop", newLeverancierObject);
		// 	const newLeverancier = response.data.newLeverancier;
		// 	toast.success("Nieuwe leverancier aangemaakt!");
		// 	setLeverancier("");
		// 	const newLeveranciers = [...inkoopProducten, newLeverancier];
		// 	localStorage.setItem("inkoopProducten", JSON.stringify(newLeveranciers));
		// 	setInkoopProducten(newLeveranciers);
		// } catch (error) {
		// 	toast.error("Nieuwe leverancier aanmaken mislukt!");
		// } finally {
		// 	setLoading(false);
		// }
		const newLeveranciers = [...inkoopProducten, newLeverancierObject];
		localStorage.setItem("inkoopProducten", JSON.stringify(newLeveranciers));
		setInkoopProducten(newLeveranciers);
		toast.success("Nieuwe leverancier aangemaakt!");
		setLeverancier("");
		setLoading(false);
	};

	return (
		<div className="content-wrapper">
			<h2>Nieuwe leverancier toevoegen</h2>
			<div className="row">
				<div className="input-container">
					<h4>Leverancier:</h4>
					<input
						type="text"
						placeholder="Leverancier"
						value={leverancier}
						onChange={(e) => setLeverancier(e.target.value)}
					/>
				</div>
			</div>
			<div className="row">
				<button
					className="btn btn-secondary"
					onClick={() => setInkoopProductStatus("read")}
				>
					Annuleren
				</button>
				<button
					className="btn btn-primary"
					onClick={handleClick}
					disabled={loading}
				>
					Toevoegen
				</button>
			</div>
		</div>
	);
};

export default CreateNewLeverancier;

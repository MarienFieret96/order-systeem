import React, { useState } from "react";
import { CloseIcon } from "../../assets/svg";

const AddBereidingsWijze = ({ bereidingsWijze, setBereidingsWijze }) => {
	const [bereiding, setBereiding] = useState({
		methode: "pan",
		manier: "",
	});

	const handleInput = (e, value) => {
		setBereiding({ ...bereiding, [value]: e.target.value });
	};

	const objectExists = (array, value) => {
		// map over array and put all keys in array
		const tempArray = array;
		const arrayOfKeys = tempArray.map((item) => {
			return Object.keys(item)[0];
		});
		// check if new key is includes in new Array
		return arrayOfKeys.includes(value);
	};
	const handleSave = () => {
		const methode = bereiding.methode;
		const manier = bereiding.manier;
		if (!manier) return;
		const tempObject = {
			[methode]: manier,
		};
		if (!objectExists(bereidingsWijze, methode)) {
			setBereidingsWijze([...bereidingsWijze, tempObject]);
			setBereiding({
				methode: "pan",
				manier: "",
			});
		} else {
			return;
		}
	};

	const handleDelete = (index) => {
		setBereidingsWijze((prevItems) =>
			prevItems.filter((item, i) => i !== index),
		);
	};

	return (
		<>
			<h4>Bereidingswijze:</h4>
			{bereidingsWijze.length !== 0 && (
				<div className="option-items">
					{bereidingsWijze.map((item, index) => {
						return (
							<div
								className="option-item"
								key={index}
								onClick={() => handleDelete(index)}
							>
								<p>{Object.keys(item)}</p>
								<button type="button">
									<CloseIcon />
								</button>
							</div>
						);
					})}
				</div>
			)}

			<div className="row">
				<select
					value={bereiding.methode}
					onChange={(e) => handleInput(e, "methode")}
				>
					<option value="pan">Pan</option>
					<option value="oven">Oven</option>
					<option value="barbeque">Barbeque</option>
					<option value="grill">Grill</option>
					<option value="koken">Koken</option>
					<option value="magnetron">Magnetron</option>
				</select>
				<input
					type="text"
					placeholder="Bereidadvies"
					value={bereiding.manier}
					onChange={(e) => handleInput(e, "manier")}
				/>
				<button type="button" className="btn btn-primary" onClick={handleSave}>
					Toevoegen
				</button>
			</div>
		</>
	);
};

export default AddBereidingsWijze;

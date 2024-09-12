import React, { useState } from "react";
import { PlusIcon, CloseIcon } from "../../assets/svg";

const AddOption = ({ opties, setOpties }) => {
	const [vraag, setVraag] = useState("");
	const [antwoorden, setAntwoorden] = useState([]);
	const [antwoordOne, setAntwoordOne] = useState("");
	const [antwoordTwo, setAntwoordTwo] = useState("");
	const handleAdd = () => {
		const option = [...antwoorden, []];
		setAntwoorden(option);
	};
	const handleChange = (onChangeValue, i) => {
		const inputData = [...antwoorden];
		inputData[i] = onChangeValue.target.value;
		setAntwoorden(inputData);
	};
	const handleDeleteQuestion = (i) => {
		const deleteValue = [...antwoorden];
		deleteValue.splice(i, 1);
		setAntwoorden(deleteValue);
	};

	// function voor optie toevoegen aan product object
	const handleAddOptie = () => {
		if (!vraag) return;
		if (!antwoordOne) return;
		if (!antwoordTwo) return;
		const tempOptie = {
			vraag: vraag,
			antwoord: [antwoordOne, antwoordTwo, ...antwoorden],
		};
		const tempOpties = [...opties, tempOptie];
		setOpties(tempOpties);
		setVraag("");
		setAntwoordOne("");
		setAntwoordTwo("");
		setAntwoorden([]);
	};
	const handleDeleteOption = (i) => {
		const deleteValue = [...opties];
		deleteValue.splice(i, 1);
		setOpties(deleteValue);
	};
	return (
		<div className="opties row">
			<h4>Opties:</h4>
			{opties.length !== 0 && (
				<div className="option-items">
					{opties.map((vraag, i) => {
						return (
							<div
								className="option-item"
								key={i}
								onClick={() => handleDeleteOption(i)}
							>
								<p>{vraag.vraag}</p>
								<button type="button">
									<CloseIcon />
								</button>
							</div>
						);
					})}
				</div>
			)}
			<input
				type="text"
				placeholder="Vraag"
				onChange={(e) => setVraag(e.target.value)}
				value={vraag}
			/>
			<input
				type="text"
				placeholder="Optie"
				onChange={(e) => setAntwoordOne(e.target.value)}
				value={antwoordOne}
			/>
			<input
				type="text"
				placeholder="Optie"
				onChange={(e) => setAntwoordTwo(e.target.value)}
				value={antwoordTwo}
			/>

			{antwoorden.map((data, i) => {
				return (
					<div key={i} className="dynamic-option">
						<input
							type="text"
							value={data}
							onChange={(e) => handleChange(e, i)}
							placeholder="Optie"
						/>
						<button
							className="dynamic-option-delete"
							type="button"
							onClick={() => handleDeleteQuestion(i)}
						>
							<CloseIcon />
						</button>
					</div>
				);
			})}
			<button
				type="button"
				className="add-dynamic-option"
				onClick={() => handleAdd()}
			>
				<PlusIcon />
			</button>
			<button
				type="button"
				className="add-option btn btn-primary"
				onClick={() => handleAddOptie()}
			>
				Optie toevoegen
			</button>
		</div>
	);
};

export default AddOption;

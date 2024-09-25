import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateInkoopProduct = ({
	setInkoopProductStatus,
	inkoopProducten,
	setInkoopProducten,
	inkoopIndex,
	inkoopProductIndex,
}) => {
	console.log(inkoopProducten[inkoopIndex].producten[inkoopProductIndex]);
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			naam: inkoopProducten[inkoopIndex].producten[inkoopProductIndex].naam,
			threshold:
				inkoopProducten[inkoopIndex].producten[inkoopProductIndex].threshold,
			leverancier: inkoopIndex,
		},
	});
	const onSubmit = (data) => {
		const currentInkoopProduct = inkoopProducten[data.leverancier].producten;
		const replaceCommaWithDot = (str) => {
			return str.includes(",") ? str.replace(/,/g, ".") : str;
		};
		const threshold = replaceCommaWithDot(data.threshold);
		const newInkoopProductObject = {
			naam: data.naam,
			voorraad: 0,
			threshold,
		};
		currentInkoopProduct[inkoopProductIndex] = newInkoopProductObject;
		const newInkoopObject = {
			leverancier: inkoopProducten[data.leverancier].leverancier,
			producten: currentInkoopProduct,
		};
		setLoading(true);

		const tempProductenArray = inkoopProducten;
		tempProductenArray[data.leverancier] = newInkoopObject;
		localStorage.setItem("inkoopProducten", JSON.stringify(tempProductenArray));
		setInkoopProducten(tempProductenArray);
		toast.success("Inkoopproduct gewijzigd");
		setInkoopProductStatus("read");
		setLoading(false);
	};

	return (
		<div className="content-wrapper">
			<h2>Inkoopproduct wijzigen</h2>
			<form spellCheck="false" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="input-container">
						<h4>Naam:</h4>
						<input
							type="text"
							id="naam"
							name="naam"
							placeholder="Naam"
							required
							autoFocus
							{...register("naam")}
						/>
					</div>
					<div className="input-container">
						<h4>Grenswaarde:</h4>
						<input
							type="text"
							inputMode="decimal"
							id="naam"
							name="naam"
							placeholder="Grenswaarde"
							required
							{...register("threshold")}
						/>
					</div>
				</div>
				<div className="row">
					<div className="input-container">
						<select
							name="leverancier"
							id="leverancier"
							{...register("leverancier")}
						>
							{inkoopProducten.map((item, index) => {
								return (
									<option key={index} value={index}>
										{item.leverancier}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="row">
					<button
						type="button"
						className="btn btn-secondary"
						onClick={() => {
							setInkoopProductStatus("read");
						}}
					>
						Annuleren
					</button>
					<button type="submit" className="btn btn-primary">
						Wijzigen
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateInkoopProduct;

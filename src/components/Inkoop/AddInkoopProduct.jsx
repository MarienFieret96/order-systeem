import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import customFetch from "../../utils/customFetch";

const AddInkoopProduct = ({ inkoopProducten, setInkoopProducten }) => {
	const [loading, setLoading] = useState(false);
	const { control, register, handleSubmit, reset } = useForm({
		defaultValues: {
			naam: "",
			threshold: "",
			leverancier: 0,
		},
	});
	const onSubmit = (data) => {
		const currentInkoopProduct = inkoopProducten[data.leverancier].producten;
		// const currentInkoopId = inkoopProducten[data.leverancier]._id;
		const replaceCommaWithDot = (str) => {
			return str.includes(",") ? str.replace(/,/g, ".") : str;
		};
		const threshold = replaceCommaWithDot(data.threshold);
		const newInkoopProductObject = {
			naam: data.naam,
			voorraad: 0,
			threshold,
		};
		const newInkoopProductenArray = [
			...currentInkoopProduct,
			newInkoopProductObject,
		];
		const newInkoopObject = {
			leverancier: inkoopProducten[data.leverancier].leverancier,
			producten: newInkoopProductenArray,
		};
		setLoading(true);

		const tempProductenArray = inkoopProducten;
		tempProductenArray[data.leverancier] = newInkoopObject;
		localStorage.setItem("inkoopProducten", JSON.stringify(tempProductenArray));
		setInkoopProducten(tempProductenArray);
		toast.success("Nieuw inkoopproduct aangemaakt");
		reset({
			naam: "",
			threshold: "",
			leverancier: 0,
		});
		setLoading(false);

		// try {
		// 	const response = await customFetch.patch(
		// 		`/inkoop/${currentInkoopId}`,
		// 		newInkoopObject,
		// 	);
		// 	const newInkoopProduct = response.data.inkoopProduct;
		// 	toast.success("Nieuw inkoopproduct aangemaakt");
		// 	reset({
		// 		naam: "",
		// 		threshold: "",
		// 		leverancier: 0,
		// 	});
		// 	const tempProductenArray = inkoopProducten;
		// 	tempProductenArray[data.leverancier] = newInkoopProduct;
		// 	localStorage.setItem(
		// 		"inkoopProducten",
		// 		JSON.stringify(tempProductenArray),
		// 	);
		// 	setInkoopProducten(tempProductenArray);
		// } catch (error) {
		// 	toast.error("Nieuw inkoopproduct aanmaken mislukt!");
		// } finally {
		// 	setLoading(false);
		// }
	};

	return (
		<div className="content-wrapper">
			<h2>Nieuw inkoopproduct toevoegen</h2>
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
					<button type="button" className="btn btn-secondary">
						Annuleren
					</button>
					<button type="submit" className="btn btn-primary">
						Toevoegen
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddInkoopProduct;

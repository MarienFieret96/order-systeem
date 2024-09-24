import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { werknemers } from "../../utils/constants";
import toast from "react-hot-toast";
import customFetch from "../../utils/customFetch";

const UpdateInpakContent = ({
	inpakProduct,
	setInpakProductStatus,
	inpakProductStatus,
	inpakIndex,
	inpakProducten,
	setInpakProducten,
	inpakProductDataIndex,
}) => {
	const [loading, setLoading] = useState(false);
	const { naam, data } = inpakProduct;
	console.log(inpakProducten);
	let oldValues = data;
	const { control, register, handleSubmit, reset, setValue } = useForm({
		defaultValues: {
			werknemer: "Gijsbert",
			inpakdatum: new Date(),
			houdbaarheidsdatum: new Date(),
			aantal: "",
			afval: 0,
		},
	});

	const onSubmit = async (data) => {
		setLoading(true);
		let toastValue = "";
		let newValue = data;
		let newInpakProductObject = {};
		if (inpakProductStatus === "update") {
			oldValues[inpakProductDataIndex] = newValue;
			newInpakProductObject = {
				naam,
				data: oldValues,
			};
			toastValue = "gewijzigd";
		} else {
			newInpakProductObject = {
				naam,
				data: [newValue, ...oldValues],
			};
			toastValue = "toegevoegd";
		}

		let InpakProductenToUpdate = inpakProducten;
		InpakProductenToUpdate[inpakIndex] = newInpakProductObject;
		localStorage.setItem(
			"inpakProducten",
			JSON.stringify(InpakProductenToUpdate),
		);
		setInpakProducten(InpakProductenToUpdate);
		setInpakProductStatus("read");

		toast.success(`${newInpakProductObject.naam} ${toastValue}!`);
		setLoading(false);
		// try {
		// 	const response = await customFetch.patch(
		// 		`/inpakken/${_id}`,
		// 		newInpakProductObject,
		// 	);
		// 	const newInpakProduct = response.data.inpakProduct;
		// 	toast.success(`${newInpakProduct.naam} ${toastValue}!`);

		// 	let InpakProductenToUpdate = inpakProducten;
		// 	InpakProductenToUpdate[inpakIndex] = newInpakProduct;

		// 	localStorage.setItem(
		// 		"inpakProducten",
		// 		JSON.stringify(InpakProductenToUpdate),
		// 	);
		// 	setInpakProducten(InpakProductenToUpdate);
		// 	setInpakProductStatus("read");
		// } catch (error) {
		// 	toast.error("Nieuwe waardes opslaan niet gelukt");
		// } finally {
		// 	setLoading(false);
		// }
	};

	useEffect(() => {
		if (inpakProductStatus === "update") {
			const { werknemer, inpakdatum, houdbaarheidsdatum, aantal, afval } =
				inpakProduct.data[inpakProductDataIndex];
			setValue("werknemer", werknemer);
			setValue("inpakdatum", new Date(inpakdatum));
			setValue("houdbaarheidsdatum", new Date(houdbaarheidsdatum));
			setValue("aantal", aantal);
			setValue("afval", afval);
		}
	}, []);

	return (
		<div className="content-wrapper">
			<h2>{naam}</h2>
			<form spellCheck="false" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="input-container">
						<h4>Inpakdatum:</h4>

						<Controller
							control={control}
							name="inpakdatum"
							render={({ field: { onChange, value } }) => (
								<DatePicker
									onChange={onChange}
									selected={value}
									placeholderText="Inpakdatum"
									dateFormat={"dd MMMM"}
								/>
							)}
						/>
					</div>
					<div className="input-container">
						<h4>Tenminste houdbaar tot:</h4>
						<Controller
							control={control}
							name="houdbaarheidsdatum"
							render={({ field: { onChange, value } }) => (
								<DatePicker
									onChange={onChange}
									selected={value}
									placeholderText="Tenminste houdbaar tot"
									dateFormat={"dd MMMM"}
								/>
							)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="input-container">
						<h4>Totaal ingepakt:</h4>
						<input
							type="number"
							{...register("aantal")}
							placeholder="Totaal ingepakt"
						/>
					</div>
					{inpakProductStatus === "update" ? (
						<div className="input-container">
							<h4>Totaal weggegooid:</h4>
							<input
								type="number"
								{...register("afval")}
								placeholder="Totaal weggegooid"
							/>
						</div>
					) : (
						<div className="input-container">
							<h4>Werknemer:</h4>
							<select
								name="werknemer"
								id="werknemer"
								{...register("werknemer")}
							>
								{werknemers.map((item) => {
									return (
										<option value={item} key={item}>
											{item}
										</option>
									);
								})}
							</select>
						</div>
					)}
				</div>
				{inpakProductStatus === "update" && (
					<div className="row">
						<div className="input-container">
							<h4>Werknemer:</h4>
							<select
								name="werknemer"
								id="werknemer"
								{...register("werknemer")}
							>
								{werknemers.map((item) => {
									return (
										<option value={item} key={item}>
											{item}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				)}

				<div className="row">
					<button
						className="btn btn-secondary"
						type="button"
						onClick={() => setInpakProductStatus("read")}
					>
						Annuleren
					</button>
					<button type="submit" disabled={loading} className="btn btn-primary">
						{inpakProductStatus === "update" ? "Wijzigen" : "Toevoegen"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateInpakContent;

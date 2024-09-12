import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { werknemers } from "../../utils/constants";
import toast from "react-hot-toast";
import customFetch from "../../utils/customFetch";

const CreateInpakContent = ({
	setInpakProductStatus,
	inpakProducten,
	setInpakProducten,
}) => {
	const [loading, setLoading] = useState(false);

	const { control, register, handleSubmit, reset } = useForm({
		defaultValues: {
			naam: "",
			werknemer: "Gijsbert",
			inpakdatum: new Date(),
			houdbaarheidsdatum: new Date(),
			aantal: "",
			afval: 0,
		},
	});

	const onSubmit = async (data) => {
		const newInpakObject = {
			naam: data.naam,
			data: {
				aantal: data.aantal,
				afval: data.afval,
				houdbaarheidsdatum: data.houdbaarheidsdatum,
				inpakdatum: data.inpakdatum,
				werknemer: data.werknemer,
			},
		};
		setLoading(true);
		try {
			const response = await customFetch.post("/inpakken", newInpakObject);
			const newInpakProduct = response.data.inpakProduct;
			toast.success(`${newInpakProduct.naam} aangemaakt!`);
			reset({
				naam: "",
				werknemer: "Gijsbert",
				inpakdatum: new Date(),
				houdbaarheidsdatum: new Date(),
				aantal: "",
				afval: 0,
			});
			const newInpakProducten = [...inpakProducten, newInpakProduct];
			localStorage.setItem("inpakProducten", JSON.stringify(newInpakProducten));
			setInpakProducten(newInpakProducten);
		} catch (error) {
			toast.error("Inpakproduct aanmaken niet gelukt!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="content-wrapper">
			<h2>Nieuw inpakproduct toevoegen</h2>
			<form spellCheck="false" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="input-container">
						<h4>Naam:</h4>
						<input
							type="text"
							id="naam"
							name="naam"
							placeholder="Naam"
							autoFocus
							{...register("naam")}
						/>
					</div>
					<div className="input-container">
						<h4>Werknemer:</h4>
						<select name="werknemer" id="werknemer" {...register("werknemer")}>
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
					<div className="input-container">
						<h4>Totaal weggegooid:</h4>
						<input
							type="number"
							{...register("afval")}
							placeholder="Over datum"
						/>
					</div>
				</div>
				<div className="row">
					<button
						className="btn btn-secondary"
						type="button"
						onClick={() => setInpakProductStatus("read")}
					>
						Annuleren
					</button>
					<button type="submit" className="btn btn-primary" disabled={loading}>
						Toevoegen
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateInpakContent;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import customFetch from "../../utils/customFetch";
import { DynamicArrayFields } from "../../components";

const CreateInstructieLijst = ({
	setCreateStatus,
	setInstructieLijsten,
	instructieLijsten,
}) => {
	console.log(instructieLijsten);
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, control, reset } = useForm({
		defaultValues: {
			titel: "",
			benodigdheden: [{ benodigdheid: "" }],
			instructies: [{ instructie: "" }],
			bereidingstijd: "",
		},
	});

	const onSubmit = (data) => {
		setLoading(true);

		const newInstructieLijsten = [...instructieLijsten, data];
		localStorage.setItem("instructies", JSON.stringify(newInstructieLijsten));
		setInstructieLijsten(newInstructieLijsten);

		reset({
			titel: "",
			benodigdheden: [{ benodigdheid: "" }],
			instructies: [{ instructie: "" }],
			bereidingstijd: "",
		});
		toast.success(`${data.titel} toegevoegd!`);
		setLoading(false);

		// try {
		// 	const response = await customFetch.post("/instructies", data);
		// 	const newInstructie = response.data.instructie;
		// 	toast.success(`${newInstructie.titel} toegevoegd!`);
		// 	reset({
		// 		titel: "",
		// 		benodigdheden: [{ benodigdheid: "" }],
		// 		instructies: [{ instructie: "" }],
		// 		bereidingstijd: "",
		// 	});
		// 	const newInstructieLijsten = [...instructieLijsten, newInstructie];
		// 	localStorage.setItem("instructies", JSON.stringify(newInstructieLijsten));
		// 	setInstructieLijsten(newInstructieLijsten);
		// } catch (error) {
		// 	toast.error("Instructielijst aanmaken niet gelukt!");
		// } finally {
		// 	setLoading(false);
		// }
	};

	const handleAnnulering = () => {
		if (instructieLijsten.length === 0) return;
		setCreateStatus(false);
	};
	return (
		<div className="content-wrapper">
			<h2>Nieuwe instructielijst</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h4>Titel</h4>
				<input type="text" {...register("titel")} />
				<h4>Benodigdheden</h4>
				<DynamicArrayFields
					register={register}
					control={control}
					values={"benodigdheden"}
					value={"benodigdheid"}
				/>
				<h4>Instructies</h4>
				<DynamicArrayFields
					register={register}
					control={control}
					values={"instructies"}
					value={"instructie"}
				/>
				<h4>Bereidingstijd</h4>
				<input type="text" {...register("bereidingstijd")} />
				<div className="row">
					<button
						className="btn btn-secondary"
						type="button"
						onClick={() => handleAnnulering()}
					>
						Annuleren
					</button>
					<button disabled={loading} type="submit" className="btn btn-primary">
						Instructielijst toevoegen
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateInstructieLijst;

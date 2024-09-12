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
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, control, reset } = useForm({
		defaultValues: {
			titel: "",
			benodigdheden: [{ benodigdheid: "" }],
			instructies: [{ instructie: "" }],
			bereidingstijd: "",
		},
	});

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await customFetch.post("/instructies", data);
			const newInstructie = response.data.instructie;
			toast.success(`${newInstructie.titel} toegevoegd!`);
			reset({
				titel: "",
				benodigdheden: [{ benodigdheid: "" }],
				instructies: [{ instructie: "" }],
				bereidingstijd: "",
			});
			const newInstructieLijsten = [...instructieLijsten, newInstructie];
			localStorage.setItem("instructies", JSON.stringify(newInstructieLijsten));
			setInstructieLijsten(newInstructieLijsten);
		} catch (error) {
			toast.error("Instructielijst aanmaken niet gelukt!");
		} finally {
			setLoading(false);
		}
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
						onClick={() => setCreateStatus(false)}
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

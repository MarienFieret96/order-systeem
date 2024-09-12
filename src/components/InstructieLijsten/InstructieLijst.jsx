import React, { useState } from "react";
import { ThrashIcon } from "../../assets/svg";
import toast from "react-hot-toast";
import customFetch from "../../utils/customFetch";
import { DeleteModal } from "../../components";

const InstructieLijst = ({
	instructieIndex,
	setInstructieIndex,
	setCreateStatus,
	instructieLijsten,
	setInstructieLijsten,
}) => {
	const { titel, benodigdheden, instructies, bereidingstijd, _id } =
		instructieLijsten[instructieIndex];
	const [deleteModal, setDeleteModal] = useState(false);

	const deleteInstructieLijst = async () => {
		try {
			await customFetch.delete(`/instructies/${_id}`);
			toast.success(`${titel} verwijderd`);
			const instructies = JSON.parse(localStorage.getItem("instructies"));
			const updatedInstructies = instructies.filter(
				(item, index) => index !== instructieIndex,
			);

			localStorage.setItem("instructies", JSON.stringify(updatedInstructies));
			if (updatedInstructies.length === instructieIndex) {
				let newInstructieIndex = instructieIndex - 1;
				if (newInstructieIndex < 0) {
					setCreateStatus(true);
				} else {
					setInstructieIndex(instructieIndex - 1);
				}
			}
			setInstructieLijsten(updatedInstructies);
		} catch (error) {
			toast.error("verwijderen mislukt!");
		} finally {
			setDeleteModal(false);
		}
	};

	const handleAnnulering = () => {
		setDeleteModal(false);
	};

	return (
		<>
			<div className="content-wrapper">
				{deleteModal && (
					<DeleteModal
						annuleren={handleAnnulering}
						bevestigen={deleteInstructieLijst}
					/>
				)}
				<div className="title-row">
					<h2>{titel}</h2>
					<div onClick={() => setDeleteModal(true)} className="svg-container">
						<ThrashIcon />
					</div>
				</div>
				<h4>Benodigdheden:</h4>
				{benodigdheden.map((item, index) => {
					return <p key={index}>{item["benodigdheid"]}</p>;
				})}
				<h4>Instructies:</h4>
				<ul>
					{instructies.map((item, index) => {
						return <li key={index}>{item["instructie"]} </li>;
					})}
				</ul>
				<br />
				{bereidingstijd && (
					<p>
						<span>Bereidingstijd:</span> {bereidingstijd}
					</p>
				)}

				<button
					type="button"
					className="btn btn-primary instructie-toevoegen"
					onClick={() => setCreateStatus(true)}
				>
					Instructielijst toevoegen
				</button>
			</div>
		</>
	);
};

export default InstructieLijst;

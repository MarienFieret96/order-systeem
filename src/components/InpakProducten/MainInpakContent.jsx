import React, { useState } from "react";
import { EditIcon, ThrashIcon } from "../../assets/svg";
import { DeleteModal, DateFormatDayMonth } from "../../components";
import toast from "react-hot-toast";
import customFetch from "../../utils/customFetch";

const MainInpakContent = ({
	data,
	naam,
	id,
	setInpakProducten,
	inpakIndex,
	setInpakIndex,
	setInpakProductStatus,
	handleEditClick,
}) => {
	const [deleteModal, setDeleteModal] = useState(false);
	const { inpakdatum, houdbaarheidsdatum, werknemer, aantal, afval } = data;

	// const handleAnnulering = () => {
	// 	setDeleteModal(false);
	// };

	// const deleteInpakProduct = async () => {
	// 	try {
	// 		await customFetch.delete(`/inpakken/${id}`);
	// 		toast.success(`${naam} verwijderd`);
	// 		const inpakProducten = JSON.parse(localStorage.getItem("inpakProducten"));
	// 		const updatedInpakProducten = inpakProducten.filter(
	// 			(item) => item._id !== id,
	// 		);
	// 		localStorage.setItem(
	// 			"inpakProducten",
	// 			JSON.stringify(updatedInpakProducten),
	// 		);
	// 		if (updatedInpakProducten.length === inpakIndex) {
	// 			setInpakIndex(inpakIndex - 1);
	// 		}
	// 		setInpakProducten(updatedInpakProducten);
	// 		setDeleteModal(false);
	// 	} catch (error) {
	// 		toast.error("verwijderen mislukt!");
	// 	}
	// };

	return (
		<>
			{/* {deleteModal && (
				<DeleteModal
					annuleren={handleAnnulering}
					bevestigen={deleteInpakProduct}
				/>
			)} */}

			<div className="row">
				<h2>{naam}</h2>

				<div className="svg-container" onClick={() => handleEditClick(0)}>
					<EditIcon />
				</div>
			</div>
			<div className="row">
				<h4>Inpakdatum:</h4>
				<DateFormatDayMonth datum={inpakdatum} />
			</div>
			<div className="row">
				<h4>Tenminste houdbaar tot:</h4>
				<DateFormatDayMonth datum={houdbaarheidsdatum} />
			</div>
			<div className="row">
				<h4>Aantal:</h4>
				<p>{aantal}</p>
			</div>
			<div className="row">
				<h4>Overdatum:</h4>
				<p>{afval}</p>
			</div>
			<div className="row">
				<h4>Werknemer:</h4>
				<p>{werknemer}</p>
			</div>
		</>
	);
};

export default MainInpakContent;

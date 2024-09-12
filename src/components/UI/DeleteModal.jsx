import React from "react";

const DeleteModal = ({ annuleren, bevestigen }) => {
	return (
		<>
			<div className="verwijder-overlay"></div>
			<div className="verwijder-modal">
				<h2>Weet u zeker dat u dit wilt verwijderen?</h2>
				<div className="row">
					<button className="btn btn-secondary" onClick={annuleren}>
						Annuleren
					</button>
					<button className="btn btn-primary" onClick={bevestigen}>
						Verwijderen
					</button>
				</div>
			</div>
		</>
	);
};

export default DeleteModal;

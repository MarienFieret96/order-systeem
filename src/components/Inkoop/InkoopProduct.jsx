import React, { useState } from "react";
import { EditIcon, MinusIcon, PlusIcon } from "../../assets/svg";

const VoorraadCounter = ({ voorraad }) => {
	return (
		<div className="counter row">
			<MinusIcon />
			<input type="number" inputMode="numeric" />
			<PlusIcon />
		</div>
	);
};

const InkoopProduct = ({
	inkoopProduct,
	inkoopIndex,
	inkoopProductStatus,
	setInkoopIndex,
	setInkoopProductStatus,
}) => {
	const { leverancier, producten } = inkoopProduct;
	const [inkoopProducten, setInkoopProducten] = useState(producten);
	const [editStatus, setEditStatus] = useState(false);
	return (
		<div className="content-wrapper inkoop">
			<h2>{leverancier}</h2>
			<div className="grid">
				<h4>Naam</h4>

				<h4>Voorraad</h4>
				<h4>Threshold</h4>
			</div>
			{inkoopProducten.map((item, index) => {
				const { naam, voorraad, threshold } = item;
				return (
					<div className="grid" key={index}>
						<p className="center">{naam}</p>

						{editStatus ? (
							<VoorraadCounter />
						) : (
							<h4 className="center">{voorraad}</h4>
						)}

						<h4 className="center">{threshold}</h4>
						<div className="svg-container">
							<EditIcon />
						</div>
					</div>
				);
			})}

			{editStatus ? (
				<div className="row">
					<button
						className="btn btn-secondary"
						onClick={() => setEditStatus(false)}
					>
						Annuleren
					</button>
					<button className="btn btn-primary">Opslaan</button>
				</div>
			) : (
				<div className="row">
					<button
						className="btn btn-secondary"
						onClick={() => setEditStatus(true)}
					>
						Voorraad wijzigen
					</button>
					<button className="btn btn-primary">Advies</button>
				</div>
			)}
		</div>
	);
};

export default InkoopProduct;

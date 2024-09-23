import React, { useEffect, useState } from "react";
import { EditIcon, MinusIcon, PlusIcon } from "../../assets/svg";

const VoorraadCounter = ({ voorraad, handleVoorraadChange, index }) => {
	return (
		<div className="counter row">
			<div
				className="svg-container"
				onClick={() => handleVoorraadChange(index, "minus")}
			>
				<MinusIcon />
			</div>
			<input
				type="text"
				inputMode="numeric"
				value={voorraad}
				onChange={(e) => handleVoorraadChange(index, e.target.value)}
			/>
			<div
				className="svg-container"
				onClick={() => handleVoorraadChange(index, "plus")}
			>
				<PlusIcon />
			</div>
		</div>
	);
};

const InkoopProduct = ({
	inkoopProducten,
	setInkoopProducten,
	inkoopIndex,
	inkoopProductStatus,
	setInkoopIndex,
	setInkoopProductStatus,
}) => {
	const { leverancier, producten } = inkoopProducten[inkoopIndex];
	const [editStatus, setEditStatus] = useState(false);
	const [productenStatus, setProductenStatus] = useState([]);

	const handleCancellation = () => {
		setEditStatus(false);
		setProductenStatus(producten);
	};

	const handleSave = () => {
		setEditStatus(false);
		setInkoopProducten((prevItems) => {
			const updatedItems = [...prevItems];
			updatedItems[inkoopIndex] = {
				...updatedItems[inkoopIndex],
				producten: productenStatus,
			};
			localStorage.setItem("inkoopProducten", JSON.stringify(updatedItems));
			return updatedItems;
		});
	};

	useEffect(() => {
		setProductenStatus(producten);
	}, [producten]);

	const handleVoorraadChange = (id, value) => {
		const replaceCommaWithDot = (str) => {
			return str.includes(",") ? str.replace(/,/g, ".") : str;
		};

		if (value === "plus") {
			setProductenStatus((prevItems) => {
				const updatedItems = [...prevItems];
				updatedItems[id] = {
					...updatedItems[id],
					voorraad: Number(updatedItems[id].voorraad) + 1,
				};
				return updatedItems;
			});
		} else if (value === "minus") {
			setProductenStatus((prevItems) => {
				const updatedItems = [...prevItems];
				updatedItems[id] = {
					...updatedItems[id],
					voorraad: Number(updatedItems[id].voorraad) - 1,
				};
				return updatedItems;
			});
		} else {
			setProductenStatus((prevItems) => {
				const result = replaceCommaWithDot(value);
				const updatedItems = [...prevItems];
				updatedItems[id] = {
					...updatedItems[id],
					voorraad: result,
				};
				return updatedItems;
			});
		}
	};

	return (
		<div className="content-wrapper inkoop">
			<h2>{leverancier}</h2>
			<div className="grid">
				<h4>Naam</h4>

				{!editStatus && (
					<>
						<h4>Voorraad</h4>
						<h4>Threshold</h4>
					</>
				)}
			</div>
			{productenStatus.map((item, index) => {
				const { naam, voorraad, threshold } = item;
				return (
					<div className="grid" key={index}>
						<p className="center">{naam}</p>

						{editStatus ? (
							<VoorraadCounter
								voorraad={voorraad}
								handleVoorraadChange={handleVoorraadChange}
								index={index}
							/>
						) : (
							<>
								<h4 className="center">{voorraad}</h4>
								<h4 className="center">{threshold}</h4>
								<div className="svg-container">
									<EditIcon />
								</div>
							</>
						)}
					</div>
				);
			})}

			{editStatus ? (
				<div className="row">
					<button
						className="btn btn-secondary"
						onClick={() => handleCancellation()}
					>
						Annuleren
					</button>
					<button className="btn btn-primary" onClick={() => handleSave()}>
						Opslaan
					</button>
				</div>
			) : (
				<div className="row">
					<button
						className="btn btn-secondary"
						onClick={() => setEditStatus(true)}
					>
						Voorraad wijzigen
					</button>
					<button
						className="btn btn-primary"
						onClick={() => setInkoopProductStatus("advies")}
					>
						Advies
					</button>
				</div>
			)}
		</div>
	);
};

export default InkoopProduct;

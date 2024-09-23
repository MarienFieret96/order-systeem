import React, { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "../../assets/svg";

const InkoopProduct = ({ voorraad, threshold }) => {
	const [adviesInkoopWaarde, setAdviesInkoopWaarde] = useState(0);

	const changeNumber = (value) => {
		if (value === "minus") {
			if (adviesInkoopWaarde === 0) return;
			setAdviesInkoopWaarde(adviesInkoopWaarde - 1);
		}
		if (value === "plus") {
			setAdviesInkoopWaarde(adviesInkoopWaarde + 1);
		}
	};

	useEffect(() => {
		const subtractAndRoundUp = (value1, value2) => {
			const result = value1 - value2;
			if (result < 0) {
				return 0;
			}
			return Math.ceil(result);
		};
		const tempResult = subtractAndRoundUp(threshold, voorraad);
		setAdviesInkoopWaarde(tempResult);
	}, []);

	return (
		<div className="counter row">
			<div className="svg-container" onClick={() => changeNumber("minus")}>
				<MinusIcon />
			</div>
			<p>{adviesInkoopWaarde}</p>
			<div className="svg-container" onClick={() => changeNumber("plus")}>
				<PlusIcon />
			</div>
		</div>
	);
};

const AdviesInkoopProduct = ({
	inkoopProducten,
	inkoopIndex,
	setInkoopProductStatus,
}) => {
	const { leverancier, producten } = inkoopProducten[inkoopIndex];

	return (
		<div className="content-wrapper inkoop">
			<h2>{leverancier}</h2>
			{producten.map((item, index) => {
				return (
					<div className="grid" key={index}>
						<p className="center">{item.naam}</p>
						<InkoopProduct
							voorraad={item.voorraad}
							threshold={item.threshold}
						/>
						<input type="checkbox" name="" id="" />
					</div>
				);
			})}
			<div className="row">
				<button
					className="btn btn-secondary"
					onClick={() => setInkoopProductStatus("read")}
				>
					Annuleren
				</button>
				<button className="btn btn-primary">Downloaden</button>
			</div>
		</div>
	);
};

export default AdviesInkoopProduct;

import React, { useState } from "react";
import { useProductsContext } from "../../context/products_context";
import { categorieen } from "../../utils/constants";
import { CloseIcon } from "../../assets/svg";

const AddRelatedProducts = ({ related, setRelated }) => {
	const [categorySelection, setCategorySelection] = useState(0);
	const [relatedProduct, setRelatedProduct] = useState("");
	const { all_categories } = useProductsContext();

	const objectExists = (array, key, value) => {
		return array.some((item) => item[key] === value);
	};

	const addRelatedProduct = () => {
		if (!relatedProduct) return;

		const tempObject = {
			naam: relatedProduct,
			categorie: categorieen[categorySelection],
		};

		if (!objectExists(related, "naam", tempObject.naam)) {
			setRelated([...related, tempObject]);
			setRelatedProduct("");
		} else {
			return;
		}
	};

	const removeRelatedProduct = (index) => {
		setRelated((prevItems) => prevItems.filter((item, i) => i !== index));
	};

	return (
		<>
			<h4>Gerelateerde producten:</h4>
			{related.length !== 0 && (
				<div className="option-items">
					{related.map((item, index) => {
						return (
							<div
								className="option-item"
								key={index}
								onClick={() => removeRelatedProduct(index)}
							>
								<p>{item.naam}</p>
								<button type="button">
									<CloseIcon />
								</button>
							</div>
						);
					})}
				</div>
			)}
			<div className="row">
				<select
					value={categorySelection}
					onChange={(e) => setCategorySelection(e.target.value)}
				>
					{categorieen.map((item, index) => {
						return (
							<option key={index} value={index}>
								{item}
							</option>
						);
					})}
				</select>
				<select
					value={relatedProduct}
					onChange={(e) => setRelatedProduct(e.target.value)}
				>
					<option value="">-</option>
					{all_categories[categorySelection].map((item, index) => {
						return (
							<option key={index} value={item.naam}>
								{item.naam}
							</option>
						);
					})}
				</select>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => addRelatedProduct()}
				>
					Toevoegen
				</button>
			</div>
		</>
	);
};

export default AddRelatedProducts;

import React, { useState } from "react";
import { EditIcon } from "../assets/svg";
import { ThrashIcon } from "../assets/svg";
import { useProductsContext } from "../context/products_context";

const CartItem = ({ item, openModal, removeFromCart, cartItemIndex }) => {
	const { gewicht, opmerkingen, stuks, keuzes, naam, _id, itemIndex, id } =
		item;
	const { products } = useProductsContext();
	const [product] = useState(products[itemIndex]);
	return (
		<>
			<div className="cart-row">
				<p className="cart-item">{naam}</p>
				<p className="cart-item">
					{gewicht.hoeveelheid &&
						`${gewicht.hoeveelheid} x ${gewicht.delen} gram`}
				</p>
				<p className="cart-item cart-item-array">
					{keuzes.map((keuze, i) => (
						<React.Fragment key={i}>{keuze}; </React.Fragment>
					))}
				</p>
				<p className="cart-item">{stuks}</p>

				<button
					type="button"
					className="cart-item icon"
					onClick={() => openModal(product, cartItemIndex)}
				>
					<EditIcon />
				</button>
				<button
					type="button"
					className="cart-item icon"
					onClick={() => removeFromCart(id)}
				>
					<ThrashIcon />
				</button>
			</div>
			{opmerkingen && (
				<div className="opmerking-row">
					<p className="opmerking-header">Opmerking:</p>
					<p className="opmerking">{opmerkingen}</p>
				</div>
			)}
		</>
	);
};

export default CartItem;

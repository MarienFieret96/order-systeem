import React from "react";
import { EditIcon } from "../../assets/svg";
import { ThrashIcon } from "../../assets/svg";

const CartItem = ({ item, openModal, removeFromCart, cartItemIndex }) => {
	const {
		aantal,
		delen,
		gewicht,
		id,
		naam,
		opties,
		prijs,
		productOpmerking,
		totaalPrijs,
		product,
	} = item;

	return (
		<>
			<div className="cart-row">
				<p className="cart-item">{naam}</p>
				<p className="cart-item">
					{gewicht && `${delen} x ${Math.round(gewicht / delen)} gram`}
				</p>
				<p className="cart-item cart-item-array">
					{opties.map((keuze, i) => (
						<React.Fragment key={i}>{keuze}; </React.Fragment>
					))}
				</p>
				<p className="cart-item">{aantal}</p>

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
					onClick={() => removeFromCart(cartItemIndex)}
				>
					<ThrashIcon />
				</button>
			</div>
			{productOpmerking && (
				<div className="opmerking-row">
					<p className="opmerking-header">Opmerking:</p>
					<p className="opmerking">{productOpmerking}</p>
				</div>
			)}
		</>
	);
};

export default CartItem;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrderContext } from "../context/orders_context";
import styled from "styled-components";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { ThrashIcon, ChatIcon, PlusIcon, EditIcon } from "../assets/svg";
import { AmountButton, CartItem, UpdateOrderModal } from "../components";
import { formatPrice } from "../utils/helpers";
import nl from "date-fns/locale/nl";
import { useProductsContext } from "../context/products_context";

const CartPage = () => {
	const navigate = useNavigate();
	const baseTime = () => {
		let today = new Date();
		today.setHours(8);
		today.setMinutes(0);
		return today;
	};
	const baseDate = () => {
		let today = new Date();
		return today;
	};

	const {
		cart,
		user,
		total_amount,
		toggleAmount,
		removeFromCart,
		clearCart,
		createOrder,
		updateOrder,
		updateUserInfo,
		setCartItems,
		clearUserInfo,
	} = useOrderContext();
	const { order_state, toggleOrder } = useProductsContext();

	const { gewicht } = cart;

	const [cartItem, setCartItem] = useState({});
	const [product, setProduct] = useState({});
	const [modal, setModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const [date, setDate] = useState(baseDate());
	const [time, setTime] = useState(baseTime());

	const increase = (id) => {
		toggleAmount(id, "inc");
	};
	const decrease = (id) => {
		toggleAmount(id, "dec");
	};

	const formatDate = (datum, tijdstip) => {
		const date = datum;
		const hour = tijdstip.getHours();
		const minute = tijdstip.getMinutes();
		date.setHours(hour);
		date.setMinutes(minute);
		return date;
	};

	const addProduct = () => {
		if (!order_state) toggleOrder();
		navigate("/products");
	};

	const openModal = (item, i) => {
		console.log(item);
		setCartItem(cart[i]);
		setProduct(item);
		setModal(true);
	};
	const closeModal = () => {
		setModal(false);
	};
	const updateCartItem = (updatedItem) => {
		let tempArray = [];
		cart.forEach((item) => {
			if (item.id !== updatedItem.id) {
				tempArray.push(item);
			} else {
				tempArray.push(updatedItem);
			}
		});
		setCartItems(tempArray);
		closeModal();
	};

	const deleteCurrentOrder = () => {
		clearUserInfo();
		clearCart();
		setDeleteModal(false);
	};

	const handleSubmit = () => {
		const { naam, telefoon, opmerking, betaalStatus, aangenomenDoor, _id } =
			user;
		const datum = formatDate(date, time);
		if (cart.length === 0) return;
		const newOrder = {
			naam,
			telefoon,
			items: cart,
			betaalStatus,
			opmerking,
			datum,
			aangenomenDoor,
			_id,
		};
		const updatedOrder = {
			naam,
			telefoon,
			orderItems: cart,
			betaalStatus,
			opmerking,
			datum,
			aangenomenDoor,
			_id,
		};
		if (_id.length !== 0) {
			updateOrder(updatedOrder);
		}
		if (_id.length === 0) {
			createOrder(newOrder);
		}
		navigate("/");

		// if id.length is meer dan 0 update anders create
	};
	const personeel = [
		"Gijsbert",
		"Marleen",
		"Gertrude",
		"Marilène",
		"Laura",
		"Brenda",
		"Jeanita",
		"Esther",
		"Tom",
		"Erica",
		"Sophie",
		"Reinier",
		"Marien",
	];

	return (
		<Wrapper>
			<form
				onSubmit={(e) => {
					e.preventDefault;
					handleSubmit();
				}}
			>
				<div className="form-container">
					<div className="delete-icon" onClick={() => setDeleteModal(true)}>
						<ThrashIcon />
					</div>
					<div className="input naam">
						<h5>Naam:</h5>
						<input
							type="text"
							placeholder="Lodewijk van Heiden"
							autoFocus
							onChange={(e) => updateUserInfo("naam", e.target.value)}
							value={user.naam}
							required
						/>
					</div>

					<div className="input telefoon">
						<h5>Telefoonnummer:</h5>
						<input
							type="number"
							placeholder="06 123 456 78"
							onChange={(e) => updateUserInfo("telefoon", e.target.value)}
							value={user.telefoon}
						/>
					</div>
					<div className="input datum">
						<h5>Datum:</h5>
						<DatePicker
							minDate={new Date()}
							selected={date}
							onChange={(date) => setDate(date)}
							dateFormat="dd MMMM"
							locale={nl}
							filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 1}
						/>
					</div>
					<div className="input tijd">
						<h5>Tijd:</h5>
						<DatePicker
							showTimeSelect
							showTimeSelectOnly
							minTime={new Date(0, 0, 0, 9, 0)}
							maxTime={new Date(0, 0, 0, 18, 30)}
							selected={time}
							onChange={(time) => setTime(time)}
							onFocus={() => setTime(new Date())}
							dateFormat="H:mm"
							locale={nl}
							timeIntervals={5}
						/>
					</div>
					<div className="select">
						<h5>Betaald:</h5>
						<select
							name="betaalstatus"
							id=""
							onChange={(e) => updateUserInfo("betaalStatus", e.target.value)}
							required
							value={user.betaalStatus}
						>
							<option value="nee">Nee</option>
							<option value="ja">Ja</option>
						</select>
					</div>
					<div className="select">
						<h5>Aangenomen door:</h5>
						<select
							name="personeel"
							id=""
							onChange={(e) => updateUserInfo("aangenomenDoor", e.target.value)}
							required
							value={user.aangenomenDoor}
						>
							{personeel.map((item, id) => {
								return (
									<option key={id} value={item}>
										{item}
									</option>
								);
							})}
						</select>
					</div>
					<div className="input textarea">
						<h5>Opmerkingen:</h5>
						<textarea
							placeholder="Eventuele opmerkingen"
							onChange={(e) => updateUserInfo("opmerking", e.target.value)}
							value={user.opmerking}
						></textarea>
					</div>
				</div>

				<div className="cart-container">
					<div className="cart-row bold">
						<p className="cart-item">Naam:</p>

						<p className="cart-item">Gewicht:</p>
						<p className="cart-item">Keuzes:</p>
						<p className="cart-item">Stuks:</p>
						<button type="button" className="cart-item icon">
							<EditIcon />
						</button>
						<button
							type="button"
							className="cart-item icon"
							onClick={() => clearCart()}
						>
							<ThrashIcon />
						</button>
					</div>
					{cart.map((item, index) => {
						return (
							<CartItem
								key={index}
								item={item}
								removeFromCart={removeFromCart}
								cartItemIndex={index}
								openModal={openModal}
							/>
						);
					})}
					<div className="cart-row">
						<div className="add-item" onClick={addProduct}>
							<PlusIcon />
						</div>
						<h4 className="total-price">totaal: {formatPrice(total_amount)}</h4>
					</div>
					<div className="btn-row">
						<Link to="/products">
							<button type="button" className="btn btn-secondary btn-modal">
								Annuleren
							</button>
						</Link>
						<button
							type="submit"
							className="btn btn-primary"
							// onClick={handleSubmit}
						>
							Bestelling plaatsen
						</button>
					</div>
				</div>
			</form>
			{modal && (
				<UpdateOrderModal
					closeModal={closeModal}
					orderItem={cartItem}
					product={product}
					updateOrderItem={updateCartItem}
				/>
			)}
			{deleteModal && (
				<div className="delete-modal">
					<div className="modal">
						<div className="overlay"></div>
						<div className="modal-content">
							<h2 className="title">Huidige bestelling wissen?</h2>
							<div className="btn-row">
								<button
									type="button"
									className="btn btn-modal btn-secondary"
									onClick={() => setDeleteModal(false)}
								>
									Annuleren
								</button>

								<button
									className="btn btn-modal btn-primary"
									onClick={deleteCurrentOrder}
									type="button"
								>
									Bevestigen
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	select,
	input,
	textarea {
		border: 1px solid var(--clr-grey);
		width: 100%;
		padding: 0.5rem;
		height: 2.25rem;
	}
	textarea {
		height: 6.75rem;

		resize: vertical;
	}
	.delete-modal {
		position: absolute;
		.modal {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			.overlay {
				height: 100vh;
				width: 100%;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				position: fixed;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(49, 49, 49, 0.8);
				overflow: hidden;
			}
			.modal-content {
				position: relative;
				background: #f1f1f1;
				padding: 2rem 2rem;
				margin: 8rem 0;
				border-radius: var(--radius);
				width: 450px;
				display: flex;
				flex-direction: column;
				gap: 1rem;
				.btn-row {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 2rem;
					margin-top: 2rem;
					.btn-modal {
						width: 100%;
						height: 65px;
					}
				}
			}
		}
	}

	.form-container {
		width: calc(100vw - 10rem);
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 1rem;
		padding: 4rem 4rem 3rem 4rem;
		margin: 2rem 2rem 0 2rem;
		border: 1px solid var(--clr-grey);
		border-bottom: none;
		border-radius: var(--radius) var(--radius) 0 0;
		background-color: var(--clr-light-grey);
		position: relative;
		.select {
			width: 100%;
			grid-column: span 3;
		}
		.react-datepicker-wrapper {
			display: block;
		}
		.input {
			width: 100%;

			h5 {
				margin-bottom: 0.5rem;
			}
		}
		.naam {
			grid-column: 1/ 4;
		}

		.telefoon {
			grid-column: 4 / 7;
		}
		.datum {
			grid-column: 1 / 4;
		}
		.tijd {
			grid-column: 4 / 7;
		}
		.textarea {
			grid-column: 1 / 7;
		}
		.delete-icon {
			position: absolute;
			right: 1rem;
			top: 1rem;
			aspect-ratio: 1;
			height: 3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			svg {
				height: 2.5rem;
			}
		}
	}
	.cart-container {
		width: calc(100vw - 10rem);
		display: grid;
		padding: 1rem 4rem 4rem 4rem;
		margin: 0 2rem 5rem 2rem;
		border: 1px solid var(--clr-grey);
		border-radius: 0 0 var(--radius) var(--radius);
		.cart-row {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr 0.5fr;
			height: 80px;
			word-wrap: break-word;
			border-top: 1px solid var(--clr-light-grey);
			button {
				border: none;
				background-color: transparent;
			}
			.cart-item {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				text-align: center;

				svg {
					padding: 0.35rem;
					fill: #ff000035;
				}
			}
			h2 {
				font-size: 1.25rem;
			}
			.icon {
				svg {
					padding: 0.75rem;
					fill: #ff000035;
				}
			}
			.total-price {
				grid-column: 4 / 7;
				display: flex;
				justify-content: end;
				align-items: center;
			}
			.add-item {
				display: flex;
				justify-content: center;
				align-items: center;
				grid-column: 3/4;
				svg {
					height: 3rem;
					aspect-ratio: 1;
					border-radius: 50%;
					padding: 0.25rem;
					background-color: var(--clr-grey);
					box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
						rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
				}
			}
		}
		.cart-row:nth-child(1) {
			border-top: none;
		}
		.cart-row:nth-child(2) {
			border: none;
		}
		.opmerking-row {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr 0.5fr;
			min-height: calc(80px - 2rem);
			margin: 1rem 0;
			.opmerking-header {
				font-weight: bold;
				grid-column: span 1;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.opmerking {
				grid-column: span 5;
				display: flex;
				justify-content: start;
				align-items: center;
			}
		}
		.bold {
			font-weight: 700;
			border-bottom: 1px solid var(--clr-grey);
		}
		.btn-row {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
			border-top: 1px solid var(--clr-grey);
			margin-top: 2rem;
			.btn-modal {
				width: 100%;
				height: 52px;
			}
			a {
				width: 100%;
			}
		}
	}
`;

export default CartPage;

import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useOrderContext } from "../context/orders_context";
import { UpdateOrderModal, OrderItemUpdate } from "../components";
import { EditIcon, PlusIcon, ThrashIcon } from "../assets/svg";

import { formatPrice } from "../utils/helpers";

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";
import { parseISO } from "date-fns";
import { useProductsContext } from "../context/products_context";

const UpdateBestellingPage = () => {
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
	const navigate = useNavigate();
	const { id } = useParams();

	const {
		total_amount,
		removeFromCart,
		clearCart,
		cart,
		single_order_loading: loading,
		single_order_error: error,
		single_order: order,
		fetchSingleOrder,
		updateUserInfo,
		setUserInfo,
		clearUserInfo,
		setCartItems,
		user,
		updateOrder,
	} = useOrderContext();
	const { order_state, toggleOrder } = useProductsContext();

	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());

	// const [betaalStatus, setBetaalStatus] = useState("nee");
	// const [aangenomenDoor, setAangenomenDoor] = useState("Gijsbert");

	const [orderArray, setOrderArray] = useState([]);
	const [orderItem, setOrderItem] = useState({});
	const [product, setProduct] = useState({});
	const [modalStatus, setModalStatus] = useState(false);

	const formatDate = (datum, tijdstip) => {
		const date = datum;
		const hour = tijdstip.getHours();
		const minute = tijdstip.getMinutes();
		date.setHours(hour);
		date.setMinutes(minute);
		return date;
	};
	useEffect(() => {
		fetchSingleOrder(id).then((response) => {
			const order = response.order;
			const {
				datum,
				naam,
				telefoon,
				opmerking,
				orderItems,
				betaalStatus,
				aangenomenDoor,
				_id,
			} = order;
			const tempUser = {
				naam,
				telefoon,
				opmerking,
				betaalStatus,
				aangenomenDoor,
				_id,
			};

			setDate(parseISO(datum));
			setTime(parseISO(datum));
			setUserInfo(tempUser);
			setOrderArray(orderItems);
		});
	}, [id]);

	const updateOrderItem = (updatedItem) => {
		let tempArray = [];
		orderArray.forEach((item) => {
			if (item._id !== updatedItem._id) {
				tempArray.push(item);
			} else {
				tempArray.push(updatedItem);
			}
		});
		setOrderArray(tempArray);
		closeModal();
	};

	const handleSubmit = () => {
		const { naam, telefoon, opmerking, betaalStatus, aangenomenDoor, _id } =
			user;
		const datum = formatDate(date, time);
		if (orderArray.length === 0) return;
		const newOrder = {
			naam,
			telefoon,
			orderItems: orderArray,
			betaalStatus,
			opmerking,
			datum,
			aangenomenDoor,
			_id,
		};
		updateOrder(newOrder);
		setOrderArray([]);
		navigate("/");
	};
	const saveUpdate = () => {};

	const removeOrderItem = (id) => {
		const tempOrderItems = orderArray.filter((item) => item._id !== id);
		setOrderArray(tempOrderItems);
	};

	const openModal = (item, i) => {
		setOrderItem(orderArray[i]);
		setProduct(item);
		setModalStatus(true);
	};
	const closeModal = () => {
		setModalStatus(false);
	};
	const addProduct = () => {
		setCartItems(orderArray);
		if (!order_state) toggleOrder();
		navigate("/products");
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return <h1>Error...</h1>;
	}
	// const { betaalStatus, datum, naam, opmerking, orderItems, status, telefoon } =
	// 	order;

	return (
		<Wrapper>
			<form
				onSubmit={(e) => {
					e.preventDefault;
					handleSubmit();
				}}
			>
				<div className="form-container">
					<div className="input naam">
						<h5>Naam:</h5>
						<input
							type="text"
							placeholder="Lodewijk"
							autoFocus
							onChange={(e) => updateUserInfo("naam", e.target.value)}
							value={user.naam}
						/>
					</div>

					<div className="input telefoon">
						<h5>Telefoonnummer:</h5>
						<input
							required
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
						<button type="button" className="cart-item icon">
							<ThrashIcon />
						</button>
					</div>
					{orderArray.map((item, i) => {
						return (
							<OrderItemUpdate
								key={i}
								item={item}
								removeOrderItem={removeOrderItem}
								openModal={openModal}
								orderItemIndex={i}
							/>
						);
					})}

					<div className="cart-row">
						<div className="add-item" onClick={addProduct}>
							<PlusIcon />
						</div>
						{/* <h4 className="total-price">totaal: {formatPrice(total_amount)}</h4> */}
					</div>
					<div className="btn-row">
						<Link to="/orders" onClick={clearUserInfo}>
							<button type="button" className="btn btn-secondary btn-modal">
								Annuleren
							</button>
						</Link>
						<button type="submit" className="btn btn-primary">
							Opslaan
						</button>
					</div>
				</div>
			</form>
			{modalStatus && (
				<UpdateOrderModal
					closeModal={closeModal}
					orderItem={orderItem}
					product={product}
					updateOrderItem={updateOrderItem}
				/>
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

export default UpdateBestellingPage;

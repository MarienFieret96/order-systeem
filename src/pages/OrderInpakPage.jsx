import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useOrderContext } from "../context/orders_context";

const locations = [
	"Koelkast voor",
	"Koelkast achter",
	"Vriezer voor",
	"Kleine vriezer",
	"Vriezer achter",
	"Koelkast vloer zalm",
	"Koelkast vloer saus",
	"Koelkast vloer kibbeling",
	"Koelkast vloer marinade",
];

const UserInfo = ({ orderState }) => {
	const { naam, telefoon, betaalStatus, aangenomenDoor, opmerking } =
		orderState;
	return (
		<div className="user-info">
			<div>
				<p>
					<span>Naam:</span>
				</p>
				<p>{naam}</p>
			</div>
			<div>
				<p>
					<span>Telefoon:</span>
				</p>
				<p>{telefoon}</p>
			</div>
			<div>
				<p>
					<span>Betaald:</span>
				</p>
				<p>{betaalStatus}</p>
			</div>
			<div>
				<p>
					<span>Aangenomen:</span>
				</p>
				<p> {aangenomenDoor} </p>
			</div>
			<div className="opmerking">
				<p>
					<span>Opmerking:</span>
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
					quos.
				</p>
			</div>
		</div>
	);
};

const OrderInfo = ({
	cart,
	updateOrderInfo,
	handleSubmit,
	handleStatusUpdate,
}) => {
	const navigate = useNavigate();

	return (
		<div className="order-info">
			<div className="order-row bold">
				<div className="order-item">Naam:</div>
				<div className="order-item">Gewicht:</div>
				<div className="order-item">Keuzes:</div>
				<div className="order-item last">Stuks:</div>
				<div className="order-item last">Locatie:</div>
				<div className="order-item last">Check:</div>
			</div>
			{cart.map((item, index) => {
				return (
					<OrderItem
						updateOrderInfo={updateOrderInfo}
						key={index}
						item={item}
						index={index}
					/>
				);
			})}
			<div className="btn-row">
				<button
					className="btn btn-secondary"
					onClick={() => {
						handleStatusUpdate();
						navigate(-1);
					}}
				>
					Annuleren
				</button>
				<button className="btn btn-primary" onClick={handleSubmit}>
					Opslaan
				</button>
			</div>
		</div>
	);
};

const OrderItem = ({ item, updateOrderInfo, index }) => {
	const [check, setCheck] = useState(false);

	const { naam, gewicht, keuzes, stuks, locatie, ingepakt, opmerkingen } = item;
	return (
		<>
			<div className={ingepakt ? "order-row stripe" : "order-row"}>
				<div className="order-item">{naam}</div>
				<div className="order-item">
					{gewicht.hoeveelheid &&
						`${gewicht.hoeveelheid} x ${gewicht.delen} gram`}
				</div>
				<div className="order-item">
					{keuzes.map((keuze, i) => (
						<React.Fragment key={i}>{keuze}; </React.Fragment>
					))}
				</div>
				<div className="order-item">{stuks}</div>
				<div className="order-item">
					<select
						name="locatie"
						id=""
						onChange={(e) => updateOrderInfo("locatie", e.target.value, index)}
						value={locatie}
					>
						{locations.map((item, id) => {
							return (
								<option key={id} value={item}>
									{item}
								</option>
							);
						})}
					</select>
				</div>
				<div className="order-item">
					<input
						defaultChecked={ingepakt}
						type="checkbox"
						onChange={(e) => updateOrderInfo("ingepakt", !ingepakt, index)}
					/>
				</div>
			</div>
			{opmerkingen && (
				<div className={check ? "opmerking-row stripe" : "opmerking-row"}>
					<p className="opmerking-header">Opmerking:</p>
					<p className="opmerking">{opmerkingen}</p>
				</div>
			)}
		</>
	);
};

const OrderInpakPage = () => {
	const { id } = useParams();
	const [orderState, setOrderState] = useState({});
	const [cart, setCart] = useState([]);
	const { fetchSingleOrder, updateOrderStatus, updateOrder } =
		useOrderContext();
	const navigate = useNavigate();

	const handleSubmit = () => {
		let order = { ...orderState, orderItems: cart };
		updateOrder(order);
		handleStatusUpdate();
		navigate("/orders");
	};
	const handleStatusUpdate = () => {
		let ordersComplete = 0;
		let newStatus = {
			status: "aangenomen",
		};
		for (const item of cart) {
			if (item.ingepakt) {
				ordersComplete += 1;
			}
		}

		if (ordersComplete === 0) {
			newStatus = {
				status: "aangenomen",
			};
		}
		if (ordersComplete === cart.length) {
			newStatus = {
				status: "ingepakt",
			};
		}
		if (0 < ordersComplete && ordersComplete < cart.length) {
			newStatus = {
				status: "inpakken",
			};
		}
		updateOrderStatus(newStatus, orderState._id);
	};

	const updateOrderInfo = (updateItem, value, index) => {
		const tempArray = [];
		cart.forEach((item, id) => {
			if (id === index) {
				let tempItem = { ...item, [updateItem]: value };
				tempArray.push(tempItem);
			} else {
				tempArray.push(item);
			}
		});
		setCart(tempArray);
	};

	useEffect(() => {
		fetchSingleOrder(id).then((response) => {
			const fetchedOrder = response.order;
			setOrderState(fetchedOrder);
			setCart(fetchedOrder.orderItems);
		});
	}, [id]);

	return (
		<Wrapper>
			<UserInfo orderState={orderState} />
			<OrderInfo
				updateOrderInfo={updateOrderInfo}
				cart={cart}
				handleSubmit={handleSubmit}
				handleStatusUpdate={handleStatusUpdate}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	.user-info {
		width: calc(100vw - 10rem);
		margin: 2rem 2rem 0 2rem;
		padding: 4rem;
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 1rem;
		border: 1px solid var(--clr-grey);
		border-bottom: none;
		border-radius: var(--radius) var(--radius) 0 0;
		background-color: var(--clr-light-grey);
		div {
			grid-column: span 3;
			width: 100%;
			p {
				margin-bottom: 0.5rem;
				text-transform: capitalize;
			}
			span {
				font-weight: 700;
			}
		}
		.opmerking {
			grid-column: span 6;
			p {
				text-transform: none;
			}
		}
	}
	.order-info {
		width: calc(100vw - 10rem);
		display: grid;
		padding: 1rem 4rem 4rem 4rem;
		margin: 0 2rem 5rem 2rem;
		border: 1px solid var(--clr-grey);
		border-radius: 0 0 var(--radius) var(--radius);
		.bold {
			font-weight: 700;
		}
		.stripe {
			text-decoration: line-through;
		}
		.order-row {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 0.5fr 1fr 0.5fr;
			min-height: 80px;
			word-wrap: break-word;
			border-top: 1px solid var(--clr-light-grey);
			gap: 1rem;
			.order-item {
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				select {
					height: 32px;
					aspect-ratio: 2 /1;
				}
				input {
					height: 32px;
					aspect-ratio: 1;
				}
			}
			.last {
				justify-content: center;
			}
		}
		.order-row:nth-child(1) {
			border-top: none;
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
	}
	.btn-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		border-top: 1px solid var(--clr-grey);
		margin-top: 2rem;
		padding-top: 2rem;
		.btn {
			height: 52px;
		}
	}
`;

export default OrderInpakPage;

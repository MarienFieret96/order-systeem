import React, { useState, useEffect } from "react";
import { CloseIcon, EqualIcon } from "../assets/svg";
import { AmountButton } from "../components";
import { formatPrice } from "../utils/helpers";
import styled from "styled-components";

const UpdateOrderModal = ({
	closeModal,
	orderItem,
	product,
	updateOrderItem,
}) => {
	const [newOrderItem, setNewOrderItem] = useState(orderItem);
	const [total, setTotal] = useState(0);
	const [productInfo] = useState(product);

	const increase = () => {
		setNewOrderItem((oldOrder) => {
			let tempAmount = oldOrder.stuks + 1;
			return { ...oldOrder, stuks: tempAmount };
		});
	};

	const decrease = () => {
		setNewOrderItem((oldOrder) => {
			let tempAmount = oldOrder.stuks - 1;
			if (tempAmount < 1) {
				tempAmount = 1;
			}
			return { ...oldOrder, stuks: tempAmount };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const {
			gewicht,
			stuks,
			keuzes,
			opmerkingen,
			itemIndex,
			_id,
			naam,
			id,
			stukPrijs,
		} = newOrderItem;

		let calcPrijs;
		let tempGewicht;
		if (productInfo.stukPrijs === "gewicht") {
			calcPrijs = (productInfo.prijs / 1000) * total;
			tempGewicht = gewicht;
		}
		if (productInfo.stukPrijs === "stuk") {
			calcPrijs = productInfo.prijs;
			tempGewicht = {};
		}

		const product = {
			_id,
			id,
			gewicht: tempGewicht,
			stuks,
			keuzes,
			opmerkingen,
			product: productInfo._id,
			prijs: calcPrijs,
			naam,
			itemIndex,
			stukPrijs,
		};

		updateOrderItem(product);
	};

	useEffect(() => {
		let newAmount =
			newOrderItem.gewicht.hoeveelheid * newOrderItem.gewicht.delen;
		setTotal(newAmount);
	}, [newOrderItem.gewicht.hoeveelheid, newOrderItem.gewicht.delen]);
	return (
		<Wrapper>
			<div className="modal">
				<div className="overlay"></div>
				<div className="modal-content">
					<form onSubmit={(e) => handleSubmit(e)} className="text">
						<h1>{newOrderItem.naam}</h1>
						<div
							className={
								product.stukPrijs === "gewicht" ? "totale-hoeveelheid" : ""
							}
						>
							<div className="gewicht-container">
								{product.stukPrijs === "gewicht" && (
									<>
										<h4>Gewicht</h4>
										<div className="hoeveelheid">
											<input
												required
												type="number"
												placeholder="0"
												autoFocus
												onChange={(e) =>
													setNewOrderItem((oldGewicht) => {
														let tempGewicht = oldGewicht.gewicht;
														tempGewicht.hoeveelheid = e.target.value;
														return { ...oldGewicht, gewicht: tempGewicht };
													})
												}
												value={newOrderItem.gewicht.hoeveelheid}
											/>
											<h6>gram</h6>
											<CloseIcon />
											<input
												className={
													newOrderItem.gewicht.delen > 9
														? "big-input"
														: "small-input"
												}
												required
												type="number"
												onChange={(e) =>
													setNewOrderItem((oldGewicht) => {
														let tempGewicht = oldGewicht.gewicht;
														tempGewicht.delen = e.target.value;
														return { ...oldGewicht, gewicht: tempGewicht };
													})
												}
												value={newOrderItem.gewicht.delen}
											/>
											<h6>
												{newOrderItem.gewicht.delen > 1 ? "stukken" : "stuk"}
											</h6>
											<EqualIcon />
											<h5>{`${total} gram`}</h5>
										</div>
									</>
								)}
							</div>
							<div className="stuks-container">
								<h4
									className={
										product.stukPrijs === "gewicht" ? "header-margin" : ""
									}
								>
									Stuks
								</h4>
								<AmountButton
									amount={newOrderItem.stuks}
									increase={increase}
									decrease={decrease}
								/>
							</div>
						</div>
						{product.opties.map((optie, id) => {
							const { vraag, antwoord } = optie;
							return (
								<div className="select" key={id}>
									<h4>Keuze {id + 1}</h4>
									<select
										required
										onChange={(e) =>
											setNewOrderItem((oldOrder) => {
												let tempOrder = oldOrder.keuzes;
												tempOrder[id] = e.target.value;
												return { ...oldOrder, keuzes: tempOrder };
											})
										}
										value={newOrderItem.keuzes[id]}
									>
										<option value="">{vraag} </option>
										{antwoord.map((item, id) => (
											<option key={id} value={item}>
												{item}
											</option>
										))}
									</select>
								</div>
							);
						})}
						<h4>Opmerkingen</h4>
						<textarea
							onChange={(e) =>
								setNewOrderItem({
									...newOrderItem,
									opmerkingen: e.target.value,
								})
							}
							placeholder="Extra opmerkingen"
						></textarea>
						<div className="btn-row">
							<button
								onClick={() => closeModal()}
								className="btn btn-modal btn-secondary"
								type="button"
							>
								Annuleren
							</button>
							<button className="btn btn-modal btn-primary" type="submit">
								Opslaan
							</button>
						</div>
					</form>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
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
			padding: 4rem 3rem;
			margin: 4rem 0;
			border-radius: var(--radius);
			width: calc(100vw - 10rem);
			display: flex;
			flex-direction: column;
			gap: 1rem;
			.text {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 1rem;
				.select {
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}
				.gewicht-container,
				.stuks-container {
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}

				.header-margin {
					margin-left: 6px;
				}

				.totale-hoeveelheid {
					display: flex;
					gap: 2rem;
					justify-content: space-between;
				}
				.hoeveelheid {
					display: flex;

					align-items: center;
					input:nth-child(1) {
						width: 52px;
						padding: 12px;
					}
					.small-input {
						width: 36px;
						display: flex;
						padding: 0 14px;
					}
					.big-input {
						width: 50px;
						display: flex;
						padding: 0 16px;
					}
					svg {
						padding: 0.5rem;
					}
					svg:nth-child(2) {
						padding: 0.8rem;
					}
					h5 {
						align-self: center;
					}
					h6 {
						margin-left: 4px;
						font-weight: 400;
					}
				}

				select,
				input,
				textarea {
					border: 1px solid var(--clr-grey);
					width: 100%;
					padding: 0.5rem;
					height: 2.25rem;
				}
				textarea {
					height: 9rem;
					resize: vertical;
				}
				h1,
				h2,
				h4 {
					text-transform: capitalize;
				}

				h1 {
					font-size: 2rem;
					font-weight: 600;
					height: 48px;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				h2 {
					font-size: 1.25rem;
					font-weight: 700;
				}
				h3 {
					font-size: 0.875rem;
					font-weight: 400;
					align-self: end;
					margin-bottom: 3px;
				}
				.money {
					display: flex;
					gap: 6px;
					padding-bottom: 1rem;
					border-bottom: 1px solid var(--clr-grey);
				}
			}
			.btn-row {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 2rem;
				margin-top: 1rem;
				border-top: 1px solid var(--clr-grey);
				.btn-modal {
					width: 100%;
					height: 65px;
				}
			}

			.close-modal {
				position: absolute;
				top: 10px;
				right: 10px;
				border: none;
			}
			.delete-product {
				position: absolute;
				top: 10px;
				left: 10px;
				border: none;
				height: 48px;
				width: 48px;
				svg {
					height: 30px;
					width: 30px;
				}
			}
		}
		.confirmation {
			padding: 2rem 2rem;
			margin: 8rem 0;
		}
	}
`;

export default UpdateOrderModal;

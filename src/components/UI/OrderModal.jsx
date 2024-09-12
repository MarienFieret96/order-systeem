import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useProductsContext } from "../../context/products_context";
import { useOrderContext } from "../../context/orders_context";
import { Prijs, Counter } from "../../components";

const OrderModal = ({ orderItem, updateOrderItem }) => {
	const { register, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			gewicht: "",
			delen: "1",
		},
	});
	const watchWeight = watch(["gewicht", "delen"]);

	const { toggleModal, state_product } = useProductsContext();
	const { addToCart } = useOrderContext();
	const { naam, prijs, opties, _id } = state_product;

	const [count, setCount] = useState(1);

	const handleClick = (str) => {
		if (str === "plus") {
			setCount(count + 1);
		}
		if (str === "min") {
			if (count === 1) {
				return;
			}
			setCount(count - 1);
		}
	};
	const configureOptions = (data) => {
		let tempArray = [];
		let tempId = "";
		for (const [key, value] of Object.entries(data)) {
			if (key !== "gewicht" && key !== "delen" && key !== "productOpmerking") {
				if (typeof value === "string" || value instanceof String) {
					tempArray.push(value);
					tempId += value;
				} else {
					if (value) {
						tempArray.push(key);
						tempId += "1";
					} else {
						tempId += "0";
					}
				}
			}
		}
		return { tempId, tempArray };
	};
	const calculatePrice = (price, gewicht) => {
		let tempAmount = 0;
		if (price.perStuk) {
			if (price.gemiddeldGewicht) {
				tempAmount = (price.gemiddeldGewicht / 1000) * price.prijs;
				return tempAmount;
			} else {
				tempAmount = price.prijs;
				return tempAmount;
			}
		} else {
			tempAmount = (gewicht / 1000) * price.prijs;
			return tempAmount;
		}
	};
	const onSubmit = (data) => {
		const options = configureOptions(data);
		const { tempId, tempArray } = options;
		const { gewicht, delen, productOpmerking } = data;
		const totaalPrijs = calculatePrice(prijs, gewicht);
		const id = naam + tempId + gewicht + delen;
		const productObject = {
			product: _id,
			id,
			naam,
			totaalPrijs,
			gewicht,
			delen,
			aantal: count,
			opties: tempArray,
			productOpmerking,
			prijs,
		};
		if (orderItem) {
			updateOrderItem(productObject);
		} else {
			addToCart(productObject);
		}
		toggleModal();
	};

	useEffect(() => {
		if (orderItem) {
			setCount(orderItem.aantal);
			setValue("productOpmerking", orderItem.productOpmerking);
			if (!prijs.perStuk) {
				setValue("gewicht", orderItem.gewicht);
				setValue("delen", orderItem.delen);
			}
			if (opties.select.length === orderItem.opties.length) {
				opties.select.forEach((item, i) => {
					setValue(item.vraag, orderItem.opties[i]);
				});
			} else {
				opties.select.forEach((item, i) => {
					setValue(item.vraag, orderItem.opties[i]);
				});
				const checkArray = orderItem.opties.slice(opties.select.length);
				opties.check.forEach((item) => {
					if (checkArray.includes(item)) {
						setValue(item, true);
					} else {
						setValue(item, false);
					}
				});
			}
		}
	}, []);

	return (
		<Wrapper>
			<div className="modal">
				<div className="overlay" onClick={toggleModal}></div>
				<div className="modal-content">
					<h1>{naam}</h1>
					<Prijs prijs={prijs} />
					<form
						onSubmit={handleSubmit(onSubmit)}
						id="optionForm"
						className="text"
					>
						<div className="row">
							<h4>Aantal</h4>
							<Counter count={count} handleClick={handleClick} />
						</div>

						{!prijs.perStuk && (
							<>
								<div className="row">
									<h4>Totaal gewicht</h4>
									<input
										type="number"
										required
										placeholder="500 gram"
										{...register("gewicht", { min: 1 })}
									/>
								</div>
								<div className="row">
									<h4>
										Verdeeld over {watchWeight[1]} stuk
										{watchWeight[1] === "1" ? "" : "s"}{" "}
									</h4>
									<input
										type="number"
										required
										{...register("delen", { min: 1 })}
									/>
								</div>
								<div className="row">
									<h4 className="italic">
										{watchWeight[1]} stuk
										{watchWeight[1] === "1" ? "" : "s"} &times;{" "}
										{Number.isInteger(
											Math.floor(
												parseInt(watchWeight[0]) / parseInt(watchWeight[1]),
											),
										)
											? Math.floor(
													parseInt(watchWeight[0]) / parseInt(watchWeight[1]),
											  )
											: "500"}{" "}
										gram = {watchWeight[0].length > 0 ? watchWeight[0] : "500"}{" "}
										gram
									</h4>
								</div>
							</>
						)}
						{opties.select.length > 0 && (
							<>
								{opties.select.map((item, i) => {
									return (
										<div className="row" key={i}>
											<h4>{item.vraag}</h4>
											<select {...register(item.vraag)}>
												{item.antwoord.map((option, j) => {
													return (
														<option key={j} value={option}>
															{option}
														</option>
													);
												})}
											</select>
										</div>
									);
								})}
							</>
						)}
						{opties.check.length > 0 && (
							<div className="row">
								{opties.check.map((item, i) => {
									return (
										<React.Fragment key={i}>
											<label>
												<input type="checkbox" {...register(item)} /> {item}
											</label>
										</React.Fragment>
									);
								})}
							</div>
						)}
						<div className="row">
							<h4>Opmerkingen</h4>
							<textarea
								name=""
								id=""
								placeholder="Eventuele opmerkingen"
								rows="5"
								{...register("productOpmerking", {
									min: 1,
								})}
							></textarea>
						</div>
						<div className="btn-row">
							<button
								onClick={toggleModal}
								className="btn btn-modal btn-secondary"
								type="button"
							>
								Annuleren
							</button>
							<button className="btn btn-modal btn-primary" type="submit">
								Toevoegen
							</button>
						</div>
					</form>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.modal {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		.overlay {
			height: 100vh;
			width: 100vw;
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
				display: flex;
				flex-direction: column;
				gap: 1rem;
				.row {
					display: flex;
					flex-direction: column;
					gap: 8px;
					textarea,
					select,
					input {
						padding: 0.375rem 0.75rem;
						font-size: 16px;
					}
					.italic {
						font-style: italic;
						font-weight: 400;
					}
					.counter {
						display: flex;
						align-items: center;
						span {
							font-size: 24px;
							width: 48px;
							display: flex;
							justify-content: center;
							align-items: center;
						}
						.center {
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
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

export default OrderModal;

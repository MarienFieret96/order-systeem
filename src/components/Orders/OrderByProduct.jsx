import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { DropdownIcon } from "../../assets/svg/DropdownIcon";
import toast from "react-hot-toast";
import SingleProductView from "./SingleProductView";

const OrderItem = ({ item }) => {
	const [open, setOpen] = useState(false);
	const [details, setDetails] = useState(false);
	const { naam, productDetails, totaal } = item;

	let stukPrijs = productDetails[0].prijs.perStuk;

	return (
		<div className="container">
			<div className="info-wrapper">
				<h1>
					{naam} - {totaal}
					{!stukPrijs ? " gram" : "x"}
				</h1>

				{open && (
					<button
						className="btn btn-primary"
						onClick={() => setDetails(!details)}
					>
						{details ? "Minder" : "Meer"} details
					</button>
				)}

				<div
					className="icon"
					style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
					onClick={() => setOpen(!open)}
				>
					<DropdownIcon />
				</div>
			</div>
			{open && (
				<div className="extra-info">
					<SingleProductView
						details={details}
						productDetails={productDetails}
						stukPrijs={stukPrijs}
					/>
				</div>
			)}
		</div>
	);
};

const OrderItemsByProduct = ({ orderByProduct }) => {
	return (
		<div className="wrapper">
			{orderByProduct.map((item, index) => {
				return <OrderItem key={index} item={item} />;
			})}
		</div>
	);
};

const OrderByProduct = ({ orders }) => {
	console.log(orders);
	const [orderArray] = useState(orders);
	const [orderItems, setOrderItems] = useState([]);
	const [orderByProduct, setOrderByProduct] = useState([]);

	useLayoutEffect(() => {
		createOrderItemsArray();
	}, []);
	useLayoutEffect(() => {
		const newObject = createNewDataset();
		const sortedObject = sortAlphabetically(newObject, "naam");
		setOrderByProduct(sortedObject);
	}, [orderItems]);

	const createOrderItemsArray = () => {
		let orderItemsArray = [];
		orderArray.forEach((itemArray) => {
			itemArray.orderItems.forEach((item) => {
				item.besteldeNaam = itemArray.naam;
				orderItemsArray.push(item);
			});
		});

		setOrderItems(orderItemsArray);
	};

	const sortAlphabetically = (arr, key) => {
		return arr.sort((a, b) => {
			const valueA = a[key]?.toString().toLowerCase() || "";
			const valueB = b[key]?.toString().toLowerCase() || "";
			return valueA.localeCompare(valueB);
		});
	};

	const createNewDataset = () => {
		let itemList = [];
		orderItems.forEach((item) => {
			const tempItem = itemList.some((itemList) => itemList.naam === item.naam);
			if (tempItem) {
				itemList.forEach((productObject, index) => {
					if (productObject.naam !== item.naam) return;
					const tempProductObject = {
						aantal: item.aantal,
						delen: Number(item.delen),
						gewicht: Number(item.gewicht),
						opties: item.opties,
						prijs: item.prijs,
						productOpmerking: item.productOpmerking,
						besteldeNaam: item.besteldeNaam,
					};
					itemList[index].productDetails.push(tempProductObject);
					if (item.prijs.perStuk) {
						itemList[index].totaal += item.aantal;
					} else {
						itemList[index].totaal += Number(item.gewicht);
					}
				});
			} else {
				let total = 0;
				if (item.prijs.perStuk) {
					total = item.aantal;
				} else {
					total = Number(item.gewicht);
				}
				const tempObject = {
					naam: item.naam,
					productDetails: [
						{
							aantal: item.aantal,
							delen: Number(item.delen),
							gewicht: Number(item.gewicht),
							opties: item.opties,
							prijs: item.prijs,
							productOpmerking: item.productOpmerking,
							besteldeNaam: item.besteldeNaam,
						},
					],
					totaal: total,
				};
				itemList.push(tempObject);
			}
		});
		console.log(itemList);
		return itemList;
	};

	return (
		<Wrapper>
			{orderByProduct.length === 0 ? (
				<h1>Loading</h1>
			) : (
				<OrderItemsByProduct orderByProduct={orderByProduct} />
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		.container {
			min-height: 100px;
			width: 100%;
			padding: 1rem 2rem;
			border: 2px solid var(--clr-grey);
			background-color: var(--clr-light-grey);
			border-radius: var(--radius);
			.info-wrapper {
				display: flex;
				justify-content: space-between;
				align-items: center;
				button {
					margin: 0;
				}
				.icon {
					height: 64px;
					aspect-ratio: 1;
					border-radius: 50%;
					border: 2px solid var(--clr-grey);
					background-color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					svg path {
						stroke: #555;
					}
				}
			}
			.extra-info {
				margin: 1rem 0;
				h2 {
					margin-bottom: 0.5rem;
					font-weight: 400;
				}
				.weight-details {
					font-size: 32px;
					font-weight: 400;
				}
				.weight-details-container {
					border-top: 1px solid #767676;
					padding: 0.75rem 0;
					h3 {
						font-weight: 400;
						span {
							font-weight: 700;
						}
					}

					.weight-details-wrapper {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 5px;
						font-size: 32px;
						h3 {
							font-weight: 400;
						}
					}
				}
			}
		}
	}
`;

export default OrderByProduct;

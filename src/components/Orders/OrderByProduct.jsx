import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { DropdownIcon } from "../../assets/svg/DropdownIcon";

const WeightedOrderItem = ({ item }) => {
	const { hoeveelheid, delen } = item;
	return (
		<h2>
			{delen} x {hoeveelheid} gram
		</h2>
	);
};

const CountedOrderItem = ({ item }) => {
	const { aantal, stuks } = item;
	return (
		<h2>
			{aantal} x {stuks} stuks
		</h2>
	);
};

const OrderItem = ({ item }) => {
	const [open, setOpen] = useState(false);
	const { gewicht, naam, stukPrijs, totalAmount } = item;

	const lookup = {
		stuk: CountedOrderItem,
		gewicht: WeightedOrderItem,
	};

	const AmountComponent = lookup[stukPrijs];

	return (
		<div className="container" onClick={() => setOpen(!open)}>
			<div className="info-wrapper">
				<h1>
					{naam} - {totalAmount}
					{stukPrijs === "gewicht" ? " gram" : "x"}
				</h1>

				<div className="icon">
					<DropdownIcon />
				</div>
			</div>
			{open && (
				<div className="extra-info">
					{gewicht.map((item, index) => {
						return <AmountComponent key={index} item={item} />;
					})}
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
	const [orderArray] = useState(orders);
	const [orderItems, setOrderItems] = useState([]);
	const [orderByProduct, setOrderByProduct] = useState([]);

	useLayoutEffect(() => {
		createOrderItemsArray();
	}, []);
	useLayoutEffect(() => {
		const tempObject = createNewDataset();
		const newObject = getTotalsAndSort(tempObject);
		setOrderByProduct(newObject);
	}, [orderItems]);

	const createOrderItemsArray = () => {
		let orderItemsArray = [];
		orderArray.forEach((itemArray) => {
			itemArray.orderItems.forEach((item) => orderItemsArray.push(item));
		});
		setOrderItems(orderItemsArray);
	};

	const getTotalsAndSort = (data) => {
		const newArray = [];
		data.forEach((item) => {
			let totalAmount = 0;
			if (item.stukPrijs === "gewicht") {
				item.gewicht.sort((a, b) => b.hoeveelheid - a.hoeveelheid);
				item.gewicht.forEach((weightItem) => {
					let tempAmount = weightItem.hoeveelheid * weightItem.delen;
					totalAmount += tempAmount;
				});
			} else {
				item.gewicht.sort((a, b) => b.stuks - a.stuks);
				item.gewicht.forEach((countItem) => {
					let tempCount = countItem.stuks * countItem.aantal;
					totalAmount += tempCount;
				});
			}
			let newObject = {
				...item,
				totalAmount,
			};
			newArray.push(newObject);
		});
		return newArray;
	};

	const createNewDataset = () => {
		let itemList = [];
		orderItems.forEach((item) => {
			const tempItem = itemList.some((itemList) => itemList.naam === item.naam);
			if (tempItem) {
				itemList.map((productObject, index) => {
					if (productObject.naam !== item.naam) return;
					if (productObject.stukPrijs === "gewicht") {
						const temporaryObject = productObject.gewicht;
						const tempValue = temporaryObject.some(
							(temporaryObject) =>
								temporaryObject.hoeveelheid === item.gewicht.hoeveelheid,
						);
						if (tempValue) {
							temporaryObject.map((temporaryItem, i) => {
								if (temporaryItem.hoeveelheid !== item.gewicht.hoeveelheid)
									return;
								let newAmount = temporaryItem.delen + item.gewicht.delen;

								itemList[index].gewicht[i] = {
									...itemList[index].gewicht[i],
									delen: newAmount,
								};
							});
						} else {
							itemList[index].gewicht.push(item.gewicht);
						}
					} else {
						const temporaryObject = productObject.gewicht;
						const tempValue = temporaryObject.some(
							(temporaryObject) => temporaryObject.stuks === item.stuks,
						);
						if (tempValue) {
							temporaryObject.map((temporaryItem, i) => {
								if (temporaryItem.stuks !== item.stuks) return;
								let newAmount = (temporaryItem.aantal += 1);
								itemList[index].gewicht[i] = {
									...itemList[index].gewicht[i],
									aantal: newAmount,
								};
							});
						} else {
							let newObject = {
								stuks: item.stuks,
								aantal: 1,
							};
							itemList[index].gewicht.push(newObject);
						}
					}
				});
			} else {
				let tempObject = {};
				if (item.stukPrijs === "gewicht") {
					tempObject = {
						naam: item.naam,
						stukPrijs: item.stukPrijs,
						gewicht: [
							{
								hoeveelheid: item.gewicht.hoeveelheid,
								delen: item.gewicht.delen,
							},
						],
					};
				} else {
					tempObject = {
						naam: item.naam,
						stukPrijs: item.stukPrijs,
						gewicht: [
							{
								stuks: item.stuks,
								aantal: 1,
							},
						],
					};
				}
				itemList.push(tempObject);
			}
		});
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
			}
		}
	}
`;

export default OrderByProduct;

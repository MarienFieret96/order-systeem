import React from "react";

const ListProductView = ({ changeToDetailView, productDetails, stukPrijs }) => {
	console.log(productDetails);
	const createNewArray = () => {
		let tempArray = [];
		if (stukPrijs) {
			productDetails.forEach((item) => {
				const tempItem = tempArray.some(
					(tempArray) => tempArray.waarde === item.aantal,
				);
				if (tempItem) {
					tempArray.forEach((j, index) => {
						if (j.waarde !== item.aantal) return;
						tempArray[index].aantal += 1;
					});
				} else {
					let tempObject = {
						waarde: item.aantal,
						aantal: 1,
					};
					tempArray.push(tempObject);
				}
			});
		} else {
			productDetails.forEach((item) => {
				const tempItem = tempArray.some(
					(tempArray) =>
						tempArray.waarde === Math.round(item.gewicht / item.delen),
				);
				if (tempItem) {
					tempArray.forEach((j, index) => {
						if (j.waarde !== Math.round(item.gewicht / item.delen)) return;
						tempArray[index].aantal += item.aantal;
					});
				} else {
					let tempObject = {
						waarde: Math.round(item.gewicht / item.delen),
						delen: item.delen,
						aantal: item.aantal,
					};
					tempArray.push(tempObject);
				}
			});
		}
		return tempArray;
	};
	const newArray = createNewArray();

	return (
		<div>
			{stukPrijs ? (
				<>
					{newArray?.map((item, index) => {
						return (
							<h3 key={index}>
								{item.aantal} x {item.waarde}
							</h3>
						);
					})}
				</>
			) : (
				<>
					{newArray?.map((item, index) => {
						return (
							<h3 key={index}>
								{item.aantal} x {item.delen} x {item.waarde} gram
							</h3>
						);
					})}
				</>
			)}
		</div>
	);
};

export default ListProductView;

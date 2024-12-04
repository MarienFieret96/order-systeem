import React, { useState, useEffect } from "react";
import { Checkbox } from "../../components";
import { useProductsContext } from "../../context/products_context";

const AddWine = ({ wijn, setWijn }) => {
	const [wijnen, setWijnen] = useState([]);
	const { categories } = useProductsContext();
	const processArray = (objects) => {
		const tempArray = wijn.map((item) => {
			return item.naam;
		});
		return objects.map((obj) => {
			if (tempArray.includes(obj.naam)) {
				return {
					name: obj.naam,
					checked: true,
				};
			} else {
				return {
					name: obj.naam,
					checked: false,
				};
			}
		});
	};
	useEffect(() => {
		const tempObject = processArray(categories[8]);
		setWijnen(tempObject);
	}, [wijn]);

	const updateCheckStatusWijn = (index) => {
		const tempWijnObject = wijnen.map((item, currentIndex) => {
			if (currentIndex === index) {
				return { ...item, checked: !item.checked };
			}
			return item;
		});
		const tempArray = [];
		tempWijnObject.forEach((item) => {
			if (item.checked) {
				const tempObject = {
					naam: item.name,
					categorie: "Wijnen",
				};
				tempArray.push(tempObject);
			}
		});
		setWijnen(tempWijnObject);
		setWijn(tempArray);
	};

	return (
		<div className="checkbox wijn">
			<h4>Wijn:</h4>
			{wijnen.map((item, index) => (
				<Checkbox
					key={item.name}
					isChecked={item.checked}
					checkHandler={() => updateCheckStatusWijn(index)}
					label={item.name}
					index={index}
				/>
			))}
		</div>
	);
};

export default AddWine;

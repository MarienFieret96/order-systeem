import React, { useState, useEffect } from "react";
import { allergenenArray } from "../../utils/constants";
import { Checkbox } from "../../components";

const AddAlergenen = ({ allergeen, setAllergeen, update }) => {
	const [allergenen, setAllergenen] = useState(allergenenArray);

	useEffect(() => {
		if (update) {
			const updateAllergenenArray = allergenenArray.map((item) => {
				if (allergeen.includes(item.name)) {
					return {
						name: item.name,
						checked: true,
					};
				} else {
					return item;
				}
			});
			setAllergenen(updateAllergenenArray);
		}
	}, []);

	const updateCheckStatusAllergeen = (index) => {
		const tempAllergeenObject = allergenen.map((item, currentIndex) => {
			if (currentIndex === index) {
				return { ...item, checked: !item.checked };
			}
			return item;
		});
		const tempArray = [];
		tempAllergeenObject.forEach((item) => {
			if (item.checked) {
				tempArray.push(item.name);
			}
		});
		setAllergenen(tempAllergeenObject);
		setAllergeen(tempArray);
	};

	return (
		<div className="checkbox wijn">
			<h4>Allergenen:</h4>

			{allergenen.map((item, index) => (
				<Checkbox
					key={item.name}
					isChecked={item.checked}
					checkHandler={() => updateCheckStatusAllergeen(index)}
					label={item.name}
					index={index}
				/>
			))}
		</div>
	);
};

export default AddAlergenen;

import React, { useState } from "react";
import { CloseIcon } from "../../assets/svg";

const AddCheck = ({ checks, setChecks }) => {
	const [check, setCheck] = useState("");
	const addCheck = () => {
		if (check === "") return;
		setChecks([...checks, check]);
		setCheck("");
	};
	const deleteCheck = (i) => {
		const tempChecks = [...checks];
		tempChecks.splice(i, 1);
		setChecks(tempChecks);
	};
	return (
		<div className="checks row">
			<h4>Check:</h4>
			{checks.length !== 0 && (
				<div className="option-items">
					{checks.map((item, index) => {
						return (
							<div
								className="option-item"
								key={index}
								onClick={() => deleteCheck(index)}
							>
								<p>{item}</p>
								<button type="button">
									<CloseIcon />
								</button>
							</div>
						);
					})}
				</div>
			)}
			<div className="row">
				<input
					type="text"
					placeholder="check"
					value={check}
					onChange={(e) => setCheck(e.target.value)}
				/>
				<button className="btn btn-primary" type="button" onClick={addCheck}>
					Toevoegen
				</button>
			</div>
		</div>
	);
};

export default AddCheck;

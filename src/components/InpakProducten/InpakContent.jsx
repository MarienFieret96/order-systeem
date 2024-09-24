import React, { useState } from "react";
import {
	MainInpakContent,
	OtherInpakContent,
	InpakTable,
} from "../../components";
const InpakContent = ({
	inpakProduct,
	setInpakProducten,
	inpakIndex,
	setInpakIndex,
	setInpakProductStatus,
	setInpakProductDataIndex,
}) => {
	console.log(inpakProduct);
	const { naam, data } = inpakProduct;
	const [moreData, setMoreData] = useState(false);

	const handleEditClick = (i) => {
		setInpakProductStatus("update");
		setInpakProductDataIndex(i);
	};

	return (
		<div className="content-wrapper">
			<MainInpakContent
				data={data[0]}
				naam={naam}
				setInpakProducten={setInpakProducten}
				inpakIndex={inpakIndex}
				setInpakIndex={setInpakIndex}
				setInpakProductStatus={setInpakProductStatus}
				handleEditClick={handleEditClick}
			/>
			{moreData && (
				<>
					<OtherInpakContent data={data} handleEditClick={handleEditClick} />
					<InpakTable data={data} />
				</>
			)}

			<div className="row">
				{moreData ? (
					<button
						className="btn btn-secondary"
						onClick={() => setMoreData(false)}
					>
						Minder weergeven
					</button>
				) : (
					<button
						className="btn btn-secondary"
						onClick={() => setMoreData(true)}
					>
						Meer weergeven
					</button>
				)}
				<button
					className="btn btn-primary"
					onClick={() => setInpakProductStatus("add")}
				>
					Inpakken
				</button>
			</div>
		</div>
	);
};

export default InpakContent;

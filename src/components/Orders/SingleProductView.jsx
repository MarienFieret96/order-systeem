import React, { useState } from "react";
import DetailedProductView from "./DetailedProductView";
import ListProductView from "./ListProductView";

const SingleProductView = ({ productDetails, stukPrijs }) => {
	const [detailedView, setDetailedView] = useState(false);
	const [detail, setDetail] = useState(0);

	const changeToDetailView = (num) => {
		setDetailedView(true);
		setDetail(num);
	};

	if (detailedView) {
		return (
			<DetailedProductView detail={detail} setDetailedView={setDetailedView} />
		);
	}

	return (
		<ListProductView
			changeToDetailView={changeToDetailView}
			productDetails={productDetails}
			stukPrijs={stukPrijs}
		/>
	);
};

export default SingleProductView;

import React, { useState } from "react";
import DetailedProductView from "./DetailedProductView";
import ListProductView from "./ListProductView";

const SingleProductView = ({ productDetails, stukPrijs, details }) => {
	if (details) {
		return (
			<DetailedProductView
				productDetails={productDetails}
				stukPrijs={stukPrijs}
			/>
		);
	}

	return (
		<ListProductView productDetails={productDetails} stukPrijs={stukPrijs} />
	);
};

export default SingleProductView;

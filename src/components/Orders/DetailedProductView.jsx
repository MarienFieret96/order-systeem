import React from "react";
import OptiesView from "./OptiesView";

const DetailedProductView = ({ productDetails, stukPrijs }) => {
	const sortBasedOnTotal = (arr) => {
		let key = "";
		if (stukPrijs) {
			key = "aantal";
		} else {
			key = "gewicht";
		}
		return arr.sort((a, b) => {
			if (a[key] > b[key]) {
				return -1;
			}
			return 0;
		});
	};
	const sortedProductDetails = sortBasedOnTotal(productDetails);
	console.log(sortedProductDetails[0].opties);

	return (
		<div>
			{stukPrijs ? (
				<>
					{sortedProductDetails?.map((item, index) => {
						return (
							<div key={index} className="weight-details-container">
								<div className="weight-details-wrapper">
									<h3 className="weight-details">{item.aantal}x</h3>
									<h3>{item.besteldeNaam}</h3>
								</div>
								<div>
									<OptiesView optie={item.opties} />
									{item.productOpmerking.length !== 0 && (
										<h3>
											<span>Opmerking:</span> {item.productOpmerking}
										</h3>
									)}
								</div>
							</div>
						);
					})}
				</>
			) : (
				<>
					{sortedProductDetails?.map((item, index) => {
						return (
							<div key={index} className="weight-details-container">
								<div className="weight-details-wrapper">
									<h3 className="weight-details">
										{item.delen} x {Math.round(item.gewicht / item.delen)} gram
									</h3>
									<h3>{item.besteldeNaam}</h3>
								</div>
								<div>
									<OptiesView optie={item.opties} />
									{item.productOpmerking.length !== 0 && (
										<h3>
											<span>Opmerking:</span> {item.productOpmerking}
										</h3>
									)}
								</div>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default DetailedProductView;

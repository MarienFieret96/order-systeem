import React from "react";

const RelatedProducts = ({ relatedProducts }) => {
	return (
		<>
			<h4>Gerelateerde producten</h4>
			<div className="row">
				{relatedProducts?.map((item, index) => {
					return (
						<p key={index}>
							{index !== 0 && <span>, </span>}
							<span className="capitalize">{item.naam}</span>
						</p>
					);
				})}
			</div>
		</>
	);
};

export default RelatedProducts;

import React, { useState } from "react";
import { useOrderContext } from "../../context/orders_context";
import { Link } from "react-router-dom";
import {
	NietAfgemaaktIcon,
	InpakkenIcon,
	IngepaktIcon,
	AangenomenIcon,
} from "../../assets/svg";

const Order = ({ naam, betaalStatus, datum, orderItems, status, _id }) => {
	const [showInfo, setShowInfo] = useState(false);
	const { updateOrderStatus } = useOrderContext();

	const views = {
		aangenomen: AangenomenIcon,
		inpakken: InpakkenIcon,
		ingepakt: IngepaktIcon,
		nietAfgemaakt: NietAfgemaaktIcon,
	};
	const CurrentView = views[status];

	const date = new Date(datum);
	const uur = date.getHours();
	let minuten = date.getMinutes();
	if (minuten === 0) {
		minuten = "00";
	}

	const handleStatusUpdate = () => {
		let newStatus = {
			status: "inpakken",
		};
		updateOrderStatus(newStatus, _id);
	};

	return (
		<div className="order-container">
			<div className="order-info" onClick={() => setShowInfo(!showInfo)}>
				<h1 className="user-info">
					{uur}
					&#58;{minuten}
					{" - "}
					{naam}
				</h1>
				{betaalStatus === "ja" ? <h1>Betaald!</h1> : ""}
				<CurrentView />
			</div>

			{showInfo && (
				<>
					<div className="order-items" onClick={() => setShowInfo(!showInfo)}>
						{orderItems.map((item, index) => {
							const { gewicht, opmerkingen, prijs, stuks, keuzes, naam, id } =
								item;
							return (
								<div className="order" key={index}>
									<div className="row">
										<div className="product">
											{gewicht.hoeveelheid ? (
												<p>
													{stuks !== 1 && `${stuks} x `}
													{`${gewicht.delen} x ${gewicht.hoeveelheid} gram `}
													{naam}
												</p>
											) : (
												<p>
													{stuks} x {naam}
												</p>
											)}
										</div>
										<div className="opties">
											<p>
												{keuzes.map((item, index) => (
													<React.Fragment key={index}>{item}; </React.Fragment>
												))}
											</p>
										</div>
									</div>
									{opmerkingen && (
										<div className="opmerking">
											<p>{opmerkingen}</p>
										</div>
									)}
								</div>
							);
						})}
					</div>
					<div className="btn-row">
						<Link to={`/orders/${_id}`}>
							<button className="btn btn-modal btn-secondary">Wijzigen</button>
						</Link>
						<Link to={`/orders/inpakken/${_id}`} onClick={handleStatusUpdate}>
							<button className="btn btn-modal btn-secondary">Inpakken</button>
						</Link>
						<Link to="/">
							<button className="btn btn-modal btn-secondary">Afstrepen</button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default Order;

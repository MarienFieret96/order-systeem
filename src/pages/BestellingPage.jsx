import { useState } from "react";
import { useOrderContext } from "../context/orders_context";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";
import { Order, OrderByProduct } from "../components";
import styled from "styled-components";

const OrderView = ({ orders }) => {
	return (
		<div className="orders">
			{orders.map((item, index) => {
				return <Order key={index} {...item} />;
			})}
		</div>
	);
};

const BestellingPage = () => {
	const { orders, fetchOrders } = useOrderContext();
	const [date, setDate] = useState(new Date());
	const [filter, setFilter] = useState("naam");
	const handleChange = (date) => {
		setDate(date);
		fetchOrders(date);
	};
	const RenderView = () => {
		if (orders.length === 0) {
			return (
				<div className="orders">
					<h1 className="no-order">Geen bestellingen</h1>
				</div>
			);
		}
		if (filter === "naam") {
			return <OrderView orders={orders} />;
		}
		if (filter === "product") {
			return <OrderByProduct orders={orders} />;
		}
	};

	return (
		<Wrapper>
			<div className="instellingen">
				<select
					name=""
					id=""
					onChange={(e) => setFilter(e.target.value)}
					value={filter}
				>
					<option value="naam">Op naam</option>
					<option value="product">Op product</option>
				</select>
				<DatePicker
					minDate={new Date()}
					selected={date}
					onChange={(date) => handleChange(date)}
					dateFormat="dd MMMM"
					locale={nl}
					filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 1}
				/>
			</div>
			<RenderView />
			{/* {orders.length !== 0 ? (
				<OrderView orders={orders} />
			) : (
				<div className="orders">
					<h1 className="no-order">Geen bestellingen</h1>
				</div>
			)} */}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 0 1rem;
	.instellingen {
		display: flex;
		height: 5rem;
		justify-content: space-between;
		align-items: center;

		gap: 2rem;
		border-bottom: 1px solid var(--clr-light-grey);
		select,
		input {
			width: 100%;
			height: 2.25rem;
			padding: 0.375rem 0.75rem;
		}
	}
	.orders {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 22px 0;
		border-bottom: 1px solid var(--clr-light-grey);
		.no-order {
			margin-top: 4rem;
			text-align: center;
		}
	}
	.order-container {
		background-color: var(--clr-light-grey);
		padding: 0 2rem;
		border-radius: var(--radius);
		.btn-row {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 2rem;
			margin-top: 1rem;
			margin-bottom: 2rem;

			.btn-modal {
				width: 100%;
				height: 48px;
			}
		}
	}
	.order-info {
		display: flex;
		gap: 1rem;
		align-items: center;
		min-height: 8rem;
		.user-info {
			margin-right: auto;
		}
		svg {
			height: 5rem;
		}
	}
	.order-items {
		border-top: 2px solid var(--clr-grey);
		border-bottom: 2px solid var(--clr-grey);
		display: flex;
		flex-direction: column;

		.order {
			border-bottom: 1px solid var(--clr-grey);
			min-height: 4rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 1rem;
			padding: 1rem 0;
			margin: 0 1rem;
			.row {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.opmerking {
				font-style: italic;
			}
		}
	}
`;

export default BestellingPage;

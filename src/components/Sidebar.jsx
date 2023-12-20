import styled from "styled-components";
import { Link } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { useOrderContext } from "../context/orders_context";

import { CompareIcon, AddIcon, BagIcon } from "../assets/svg";

const Sidebar = () => {
	const { toggleCompare, compare_state, modal, order_state, toggleOrder } =
		useProductsContext();

	if (compare_state && modal) return;
	if (order_state && modal) return;
	if (modal) return;

	return (
		<Wrapper>
			<div
				className={compare_state ? "icon-container active" : "icon-container"}
				onClick={toggleCompare}
			>
				<div className="icon">
					<CompareIcon />
				</div>
				<div className="icon-text">
					<h6>Product vergelijken</h6>
				</div>
			</div>
			<div
				className={order_state ? "icon-container active" : "icon-container"}
				onClick={toggleOrder}
			>
				<div className="icon">
					<BagIcon />
				</div>
				<div className="icon-text">
					<h6>Nieuwe bestelling</h6>
				</div>
			</div>
			<Link to="/newproduct">
				<div className="icon-container link">
					<div className="icon">
						<AddIcon />
					</div>
					<div className="icon-text">
						<h6>Product toevoegen</h6>
					</div>
				</div>
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	gap: 1rem;
	margin-top: 16px;

	.icon-container {
		padding: 0 16px;
		height: 86px;
		width: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-radius: 0 var(--radius) var(--radius) 0;
		transition: var(--transition);
		h6 {
			font-weight: 600;
		}
	}
	.active {
		background-color: var(--clr-light-grey);
		h6 {
			font-weight: 800;
		}
	}
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.icon-text {
		text-align: center;
		margin-bottom: 5px;
	}
	.link:active {
		background-color: var(--clr-light-grey);
		h6 {
			font-weight: 800;
		}
	}
`;

export default Sidebar;

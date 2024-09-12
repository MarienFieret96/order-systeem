import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BackIcon, CartIcon, ForwardIcon, HomeIcon } from "../../assets/svg";
import { useOrderContext } from "../../context/orders_context";
import { SearchBar } from "../../components";

const Navbar = () => {
	const navigate = useNavigate();
	const { total_items } = useOrderContext();

	return (
		<Wrapper>
			<Link to="/">
				<HomeIcon />
			</Link>
			<div onClick={(e) => navigate(-1)} className="back">
				<BackIcon />
			</div>
			<div onClick={(e) => navigate(1)}>
				<ForwardIcon />
			</div>
			<SearchBar />
			<Link to="/cart">
				<div className="cart">
					<CartIcon />
					<h5>{total_items}</h5>
				</div>
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.nav`
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	padding: 0 1rem;
	.back {
		margin-left: 8px;
	}
	.overlay {
		background-color: #3f3f3f74;
		position: fixed;
		z-index: 987;
		inset: 0;
	}

	.searchbar {
		position: relative;
		z-index: 988;
		flex: 1;
		margin-left: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--clr-grey);
		border-radius: 1rem;
		input {
			height: 3rem;
			flex: 1;
			font-size: 1rem;
			padding: 0 1rem;
			border: 1px solid var(--clr-grey);
			border-radius: 1rem 0 0 1rem;
		}
		.search-icon {
			svg {
				border: 1px solid var(--clr-grey);
				border-radius: 0 1rem 1rem 0;
				height: 3rem;
				padding: 0 1rem;
				background-color: var(--clr-light-grey);
				vertical-align: top;
			}
		}
		.search-results {
			position: absolute;
			z-index: 989;
			left: 0;
			right: 0;
			background-color: var(--clr-white);
			border-radius: 1rem;
			border: 2px solid var(--clr-grey);
			overflow: hidden;
			.search-result {
				height: 80px;
				display: flex;
				align-items: center;
				gap: 1rem;
				border-top: 1px solid var(--clr-grey);
			}
		}
	}
	.cart {
		position: relative;
		h5 {
			position: absolute;
			top: 0;
			right: 0;
			background-color: red;
			height: 20px;
			width: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			pointer-events: none;
		}
	}
`;

export default Navbar;

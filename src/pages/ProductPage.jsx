import styled from "styled-components";
import { Sidebar, Products, Categories } from "../components";

const ProductPage = () => {
	return (
		<Wrapper>
			<Sidebar />
			<div className="products">
				<Categories />
				<Products />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	max-height: 100vh;
	max-width: 100%;
	.products {
		width: 100%;
		/* padding-left: 1rem; */
	}
`;

export default ProductPage;

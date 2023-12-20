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
	.products {
		/* display: flex;
		justify-content: start;
		align-items: center; */
	}
`;

export default ProductPage;

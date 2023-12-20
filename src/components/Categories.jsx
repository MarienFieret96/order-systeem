import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { categoryArray } from "../utils/constants";

const Categories = () => {
	const { setCategory, compare, modal, order } = useProductsContext();

	if (compare && modal) return;
	if (order && modal) return;
	if (modal) return;
	return (
		<Wrapper>
			{categoryArray.map((item, index) => {
				return (
					<div
						key={index}
						className="item"
						data-key={index}
						onClick={(e) => setCategory(e.target.dataset.key)}
						style={{
							color: item.style.color,
							background: item.style.background,
						}}
					>
						{item.naam}
					</div>
				);
			})}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 1rem;
	margin: 1rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid var(--clr-grey);
	.item {
		aspect-ratio: 3 /2;
		width: 100%;

		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 20px;
		text-align: center;
		box-shadow: var(--light-shadow);
	}
`;

export default Categories;

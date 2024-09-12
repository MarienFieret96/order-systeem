import styled from "styled-components";
import { useProductsContext } from "../../context/products_context";
import { categoryArray } from "../../utils/constants";
import { Modal, CompareModal, OrderModal } from "../../components";
import { CloseIcon } from "../../assets/svg";

const Products = () => {
	//local state for modal

	//get categories, products and helpers from global state
	const {
		categorie_index,
		categories,
		category_loading,
		error,
		products,
		modal,
		toggleModal,
		setProduct,
		product_index,
		compare_state,
		addProductToCompare,
		compare_products,
		order_state,
	} = useProductsContext();

	const handleOnClick = (i) => {
		if (compare_state) {
			addProductToCompare(i);

			return;
		}
		setProduct(i);
		toggleModal();
	};

	//return error if anything goes wrong
	if (error) {
		return <h1>Error...</h1>;
	}

	//return loading while loading is active
	if (category_loading) {
		return <h1>Loading...</h1>;
	}
	// compare products page
	if (compare_state && modal) {
		return <CompareModal />;
	}
	// add to order page
	if (order_state && modal) {
		return <OrderModal />;
	}

	//modal page
	if (modal) {
		return <Modal />;
	}

	//product page

	return (
		<Wrapper>
			{compare_state && (
				<>
					<div className="compare-row">
						<div className="compare-items">
							{compare_products.map((item, id) => {
								return (
									<div className="compare-item" key={item.slug}>
										<p>{item.naam}</p>
										<button onClick={(e) => addProductToCompare(item)}>
											<CloseIcon />
										</button>
									</div>
								);
							})}
						</div>
						<button
							className="compare-btn"
							onClick={toggleModal}
							disabled={compare_products.length < 2}
						>
							Vergelijken
						</button>
					</div>
				</>
			)}
			<div className="categories">
				{categories[categorie_index]?.map((item, index) => {
					return (
						<div
							onClick={() => handleOnClick(item)}
							key={index}
							className="item"
							style={{
								color: categoryArray[categorie_index].style.color,
								background: categoryArray[categorie_index].style.background,
							}}
						>
							{item.naam}
						</div>
					);
				})}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.categories {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 0.5rem;
		margin: 1rem;
		padding-bottom: 1rem;
		/* padding-left: 1rem; */
		border-bottom: 1px solid var(--clr-grey);
		.item {
			/* word-wrap: break-word; */
			aspect-ratio: 3 / 2;
			max-width: 100%;
			max-height: 100%;
			overflow: hidden;
			display: flex;
			justify-content: center;
			padding: 1rem;
			align-items: center;
			border-radius: 20px;
			text-align: center;
			box-shadow: var(--light-shadow);
			text-overflow: ellipsis;
		}
	}
	.compare-row {
		display: flex;
		margin: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--clr-grey);
		.compare-items {
			flex: 1;
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			.compare-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 0.5rem;
				padding: 0.375rem 0.75rem;
				height: 2.25rem;
				border: 1px solid var(--clr-grey);
				border-radius: var(--radius);
				background-color: var(--clr-light-grey);
				box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
				button {
					width: 2.25rem;
					height: 2.25rem;
					border: none;
					background-color: transparent;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 4px;
					margin-right: -12px;
					margin-top: 0;
				}
			}
		}
		.compare-btn {
			text-transform: uppercase;
			padding: 0.375rem 0.75rem;
			letter-spacing: var(--spacing);
			font-weight: 400;
			transition: var(--transition);
			font-size: 0.875rem;
			cursor: pointer;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
			border-radius: var(--radius);
			border-color: transparent;
		}
	}
	/* .option-items {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		.option-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.5rem;
			padding: 0.375rem 0.75rem;
			height: 2.25rem;
			border: 1px solid var(--clr-grey);
			border-radius: var(--radius);
			padding: 0.375rem 0.75rem;
			background-color: var(--clr-light-grey);
			box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
			button {
				width: 2.25rem;
				height: 2.25rem;
				border: none;
				background-color: transparent;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 4px;
				margin-right: -12px;
			}
		}
	} */
`;

export default Products;

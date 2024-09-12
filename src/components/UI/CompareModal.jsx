import { useEffect, useState } from "react";
import styled from "styled-components";
import { useProductsContext } from "../../context/products_context";
import { CompareModalContent } from "../../components";
import { CloseIcon } from "../../assets/svg";

const CompareModal = () => {
	const [enable, setEnable] = useState(true);

	const handleSelectionOff = (index) => {
		addProductToCompare(index);
		if (compare_products.length < 3) {
			setEnable(false);
		}
	};
	const {
		products,
		toggleModal,
		toggleCompare,
		compare_products,
		addProductToCompare,
	} = useProductsContext();

	const handleClick = () => {
		toggleCompare();
		toggleModal();
	};
	useEffect(() => {
		if (compare_products.length < 3) {
			setEnable(false);
		}
	}, []);

	return (
		<CompareWrapper>
			<div className="modal-container">
				<div className="modal">
					<div className="overlay">
						<div onClick={() => handleClick()} className="close-modal-btn">
							<CloseIcon />
						</div>
					</div>

					{compare_products.map((item, id) => {
						return (
							<CompareModalContent
								key={id}
								product={item}
								index={item}
								enable={enable}
								handleSelectionOff={() => handleSelectionOff(item)}
							/>
						);
					})}
				</div>
			</div>
		</CompareWrapper>
	);
};

const CompareWrapper = styled.div`
	.modal-container {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: start;
		flex-direction: column;
		position: relative;
		max-width: 100vw;
		overflow-x: scroll;
		-ms-overflow-style: none;
		scrollbar-width: none;
		.modal {
			position: relative;
			display: flex;
			align-items: stretch;
			justify-content: start;
			flex-direction: row;

			gap: 1rem;
			margin: 4rem 2rem;
			.overlay {
				height: 100vh;
				width: 100vw;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				position: fixed;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(49, 49, 49, 0.8);
				overflow: hidden;
				.close-modal-btn {
					width: 4.5rem;
					height: 4.5rem;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					border: none;
					margin: 0 auto;
					background-color: #000;
					border: 1px solid black;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
					position: absolute;
					bottom: 24px;
					right: calc(50% - 2.25rem);
					svg {
						path {
							stroke: white;
						}
					}
				}
			}
			.modal-content {
				position: relative;
				background: #f1f1f1;
				padding: 4rem 2rem;
				border-radius: var(--radius);
				width: calc((100vw - 12rem) / 2);
				display: flex;
				flex-direction: column;
				gap: 1rem;
				min-height: 100%;

				.text {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 1rem;
					/* min-height: 600px; */
					h1 {
						font-size: 2rem;
						font-weight: 600;
						height: 48px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
					h2 {
						font-size: 1.25rem;
						font-weight: 700;
					}
					h3 {
						font-size: 0.875rem;
						font-weight: 400;
						align-self: end;
						margin-bottom: 3px;
					}
					.money {
						display: flex;
						gap: 6px;
					}
				}
				.btn-row2 {
					display: flex;
					margin-top: 2rem;
					.btn-modal {
						width: 100%;
						height: 65px;
					}
				}
				.close-modal {
					position: absolute;
					display: flex;
					justify-content: center;
					align-items: center;
					top: 10px;
					right: 10px;
					height: 48px;
					width: 48px;
					border: 2px solid #66666666;
					border-radius: 50%;
				}
			}
		}
	}
	.modal-container::-webkit-scrollbar {
		display: none;
	}
`;

export default CompareModal;

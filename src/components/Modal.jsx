import { useState } from "react";
import styled from "styled-components";
import { CloseIcon, ThrashIcon } from "../assets/svg";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";

const Modal = ({ product }) => {
	const [confirmation, setConfirmation] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toggleModal, deleteProduct, toggleOrder, addProductToOrder } =
		useProductsContext();
	const {
		naam,
		prijs,
		beschrijving,
		stukPrijs,
		leverancier,
		allergenen,
		herkomst,
		vangstmethode,
		gerechten,
		saus,
		wijn,
		productIndex,
		_id,
	} = product;
	console.log(product);

	const handleDelete = async (_id, productIndex, naam) => {
		setLoading(true);
		const deleteProductStatus = await deleteProduct(_id, productIndex, naam);
		if (!deleteProductStatus) {
			setLoading(false);
			return;
		}
		setConfirmation(false);
		setLoading(false);
		toggleModal();
	};

	if (confirmation) {
		return (
			<Wrapper>
				<div className="modal">
					<div
						className="overlay"
						onClick={() => {
							setConfirmation(false);
						}}
					></div>
					<div className="modal-content confirmation">
						<h2 className="title">{naam} verwijderen?</h2>
						<div className="btn-row">
							<button
								onClick={() => {
									setConfirmation(false);
								}}
								className="btn btn-modal btn-secondary"
							>
								terug
							</button>
							<button
								onClick={() => {
									handleDelete(_id, productIndex, naam);
								}}
								className="btn btn-modal btn-primary"
								disabled={loading}
							>
								Verwijderen
							</button>
						</div>
					</div>
				</div>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<div className="modal">
				<div className="overlay" onClick={toggleModal}></div>
				<div className="modal-content">
					<div className="text">
						<h1>{naam}</h1>
						<div className="money">
							{stukPrijs === "gewicht" ? (
								<h2>{formatPrice(prijs / 10)}</h2>
							) : (
								<h2>{formatPrice(prijs)}</h2>
							)}
							<h3>{stukPrijs === "gewicht" ? "per 100 gram" : "per stuk"}</h3>
						</div>
						<h4>Beschrijving</h4>
						<p>{beschrijving}</p>
						<h4>Bereidingswijzen</h4>
						<ul>
							{gerechten.map((item, id) => {
								if (!item.checked) return;
								return <li key={id}>{item.name}</li>;
							})}
						</ul>
						<h4>Wijnen</h4>
						<ul>
							{wijn.map((item, id) => {
								if (!item.checked) return;
								return <li key={id}>{item.name}</li>;
							})}
						</ul>
						<ul>
							{saus.map((item, id) => {
								if (!item.checked) return;
								return <li key={id}>{item.name}</li>;
							})}
						</ul>
						<h4>Herkomst</h4>
						<p>{herkomst}</p>
						<h4>Vangstmethode</h4>
						<p>{vangstmethode}</p>
						<h4>Leverancier</h4>
						<p>{leverancier}</p>
						<ul>
							{allergenen.map((item, id) => {
								if (!item.checked) return;
								return <li key={id}>{item.name}</li>;
							})}
						</ul>
					</div>
					<button className="close-modal" onClick={toggleModal}>
						<CloseIcon />
					</button>
					<button
						className="delete-product"
						onClick={() => {
							setConfirmation(true);
						}}
					>
						<ThrashIcon />
					</button>

					<div className="btn-row">
						<Link to="/updateproduct">
							<button
								onClick={toggleModal}
								className="btn btn-modal btn-secondary"
							>
								Product wijzigen
							</button>
						</Link>
						<button
							onClick={() => addProductToOrder(productIndex)}
							className="btn btn-modal btn-primary"
						>
							Toevoegen aan bestelling
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.modal {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
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
		}
		.modal-content {
			position: relative;
			background: #f1f1f1;
			padding: 4rem 2rem;
			margin: 2rem 0;
			border-radius: var(--radius);
			width: 80%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			.text {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 1rem;

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
			.btn-row {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 2rem;
				margin-top: 2rem;
				.btn-modal {
					width: 100%;
					height: 65px;
				}
			}

			.close-modal {
				position: absolute;
				top: 10px;
				right: 10px;
				border: none;
			}
			.delete-product {
				position: absolute;
				top: 10px;
				left: 10px;
				border: none;
				height: 48px;
				width: 48px;
				svg {
					height: 30px;
					width: 30px;
				}
			}
		}
		.confirmation {
			padding: 2rem 2rem;
			margin: 8rem 0;
		}
	}
`;

export default Modal;

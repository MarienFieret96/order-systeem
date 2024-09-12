import { useState } from "react";
import styled from "styled-components";
import { CloseIcon, ThrashIcon } from "../../assets/svg";
import { useProductsContext } from "../../context/products_context";
import { Link } from "react-router-dom";
import {
	Prijs,
	Allergenen,
	RelatedProducts,
	Wijnen,
	LeverDatum,
	BereidingsWijze,
} from "../../components";

const Modal = () => {
	const [confirmation, setConfirmation] = useState(false);
	const [loading, setLoading] = useState(false);
	const {
		toggleModal,
		deleteProduct,
		toggleOrder,
		addProductToOrder,
		state_product,
	} = useProductsContext();
	const {
		naam,
		prijs,
		beschrijving,
		leverancier,
		allergenen,
		categorie,
		herkomst,
		vangstmethode,
		wijn,
		relatedProducts,
		bereidingsWijze,
		bewaarAdvies,
		productIndex,
		_id,
	} = state_product;

	const herkomstCheck =
		categorie === "Verse vis" ||
		categorie === "Verse filet" ||
		categorie === "Diepvries" ||
		categorie === "Oesters" ||
		categorie === "Schaal- en schelpdieren" ||
		categorie === "Gerookte vis";
	const bereidCheck =
		categorie === "Verse vis" ||
		categorie === "Verse filet" ||
		categorie === "Maaltijden" ||
		categorie === "Soepen" ||
		categorie === "Diepvries";
	const wijnCheck = categorie === "Verse vis" || categorie === "Verse filet";

	const handleDelete = async (_id, naam) => {
		setLoading(true);
		const deleteProductStatus = await deleteProduct(_id, naam);
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
									handleDelete(_id, naam);
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
						<Prijs prijs={prijs} />
						<p>{beschrijving}</p>
						{bereidCheck && (
							<BereidingsWijze bereidingsWijze={bereidingsWijze} />
						)}
						<h4>Bewaaradvies</h4>
						<p>{bewaarAdvies}</p>
						{herkomstCheck && (
							<>
								<h4>Herkomst</h4>
								<p>{herkomst}</p>
								<h4>Vangstmethode</h4>
								<p className="capitalize">{vangstmethode}</p>
							</>
						)}
						<LeverDatum leverancier={leverancier} />
						<Allergenen allergenen={allergenen} />
						{wijnCheck && <Wijnen wijn={wijn} />}

						<RelatedProducts relatedProducts={relatedProducts} />
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
							onClick={() => addProductToOrder()}
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
			z-index: 990;
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
			z-index: 991;
			.text {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				h1 {
					font-size: 2rem;
					font-weight: 600;
					height: 48px;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					/* margin-bottom: 0.5rem; */
				}
				h2 {
					font-size: 1.25rem;
					font-weight: 700;
					margin-bottom: 1rem;
				}
				h3 {
					font-size: 0.875rem;
					font-weight: 400;
					align-self: end;
					margin-bottom: calc(1rem + 3px);
				}
				p {
					margin-bottom: 0.5rem;
				}
				ul li:nth-last-child(1) span {
					display: none;
				}
				li {
					list-style: none;
					margin-bottom: 0.25rem;
					margin-right: 0.5rem;
					display: inline-block;
					text-transform: capitalize;
				}
				.money {
					display: flex;
					gap: 6px;
				}
				.row {
					display: flex;
					flex-wrap: wrap;
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

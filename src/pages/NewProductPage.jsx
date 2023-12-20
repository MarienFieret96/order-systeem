import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
	categoryArray,
	allergenenArray,
	wijnenArray,
	gerechtenArray,
	sauzenArray,
} from "../utils/constants";
import { Checkbox } from "../components";
import { PlusIcon, CloseIcon } from "../assets/svg";
import { useProductsContext } from "../context/products_context";

const NewProductPage = ({ newProp }) => {
	const navigate = useNavigate();
	const newProduct = newProp;
	// global state
	const { createProduct, updateProduct, products, product_index } =
		useProductsContext();

	// local state
	// dynamisch extra opties state
	const [vraag, setVraag] = useState("");
	const [antwoorden, setAntwoorden] = useState([]);
	const [antwoordOne, setAntwoordOne] = useState("");
	const [antwoordTwo, setAntwoordTwo] = useState("");
	const [modal, setModal] = useState(false);

	// product object state

	const [product, setProduct] = useState({
		naam: "",
		prijs: "",
		beschrijving: "",
		stukPrijs: "",
		leverancier: "",
		allergenen: allergenenArray,
		opties: [],
		categorie: "",
		herkomst: "",
		vangstmethode: "",
		wijn: wijnenArray,
		gerechten: gerechtenArray,
		saus: sauzenArray,
		productIndex: products.length,
	});

	useEffect(() => {
		if (!newProduct) {
			const tempProduct = products[product_index];

			setProduct({
				naam: tempProduct.naam,
				prijs: tempProduct.prijs,
				beschrijving: tempProduct.beschrijving,
				stukPrijs: tempProduct.stukPrijs,
				leverancier: tempProduct.leverancier,
				allergenen: tempProduct.allergenen,
				opties: tempProduct.opties,
				categorie: tempProduct.categorie,
				herkomst: tempProduct.herkomst,
				vangstmethode: tempProduct.vangstmethode,
				wijn: tempProduct.wijn,
				gerechten: tempProduct.gerechten,
				saus: tempProduct.saus,
				productIndex: tempProduct.productIndex,
			});
		}
	}, []);

	const updateCheckStatusAllergeen = (index) => {
		setProduct({
			...product,
			allergenen: product.allergenen.map((item, currentIndex) =>
				currentIndex === index ? { ...item, checked: !item.checked } : item,
			),
		});
	};
	const updateCheckStatusWijn = (index) => {
		setProduct({
			...product,
			wijn: product.wijn.map((item, currentIndex) =>
				currentIndex === index ? { ...item, checked: !item.checked } : item,
			),
		});
	};
	const updateCheckStatusGerecht = (index) => {
		setProduct({
			...product,
			gerechten: product.gerechten.map((item, currentIndex) =>
				currentIndex === index ? { ...item, checked: !item.checked } : item,
			),
		});
	};
	const updateCheckStatusSaus = (index) => {
		setProduct({
			...product,
			saus: product.saus.map((item, currentIndex) =>
				currentIndex === index ? { ...item, checked: !item.checked } : item,
			),
		});
	};

	// functions voor toevoegen en verwijderen van extra opties
	const handleAdd = () => {
		const option = [...antwoorden, []];
		setAntwoorden(option);
	};
	const handleChange = (onChangeValue, i) => {
		const inputData = [...antwoorden];
		inputData[i] = onChangeValue.target.value;
		setAntwoorden(inputData);
	};
	const handleDeleteQuestion = (i) => {
		const deleteValue = [...antwoorden];
		deleteValue.splice(i, 1);
		setAntwoorden(deleteValue);
	};

	// function voor optie toevoegen aan product object
	const handleAddOptie = () => {
		if (!vraag) return;
		if (!antwoordOne) return;
		if (!antwoordTwo) return;
		const tempOptie = {
			vraag: vraag,
			antwoord: [antwoordOne, antwoordTwo, ...antwoorden],
		};
		const tempOpties = [...product.opties, tempOptie];
		setProduct({ ...product, opties: tempOpties });
		setVraag("");
		setAntwoordOne("");
		setAntwoordTwo("");
		setAntwoorden([]);
	};
	const handleDeleteOption = (i) => {
		const deleteValue = [...product.opties];
		deleteValue.splice(i, 1);
		setProduct({ ...product, opties: deleteValue });
	};

	const handleNewSubmit = async (e) => {
		e.preventDefault();
		const createProductStatus = await handleSaveProduct();
		if (!createProductStatus) return;
		setModal(true);
	};

	const handleSaveProduct = async (e) => {
		if (newProduct) {
			const createProductStatus = await createProduct(product);
			return createProductStatus;
		} else {
			const createProductStatus = await updateProduct(
				product,
				products[product_index]._id,
			);
			return createProductStatus;
		}
	};

	const AddExtraProduct = () => {
		setProduct({
			naam: "",
			prijs: "",
			beschrijving: "",
			stukPrijs: "",
			leverancier: "",
			allergenen: allergenenArray,
			opties: [],
			categorie: "",
			herkomst: "",
			vangstmethode: "",
			wijn: wijnenArray,
			gerechten: gerechtenArray,
			saus: sauzenArray,
			productIndex: products.length,
		});
		setModal(false);
	};

	const navigateProducts = () => {
		setModal(false);
		navigate("/products");
	};
	const navigateHome = () => {
		setModal(false);
		navigate("/");
	};

	if (modal) {
		return (
			<Wrapper>
				<div className="modal">
					<div className="overlay" onClick={AddExtraProduct}></div>
					<div className="modal-content">
						<h2 className="title">
							{product.naam} {newProduct ? "toegevoegd" : "aangepast"}
						</h2>
						<div className="btn-row">
							{newProduct ? (
								<button
									type="button"
									className="btn btn-modal btn-secondary"
									onClick={AddExtraProduct}
								>
									nieuw product aanmaken
								</button>
							) : (
								<button
									type="button"
									className="btn btn-modal btn-secondary"
									onClick={navigateHome}
								>
									terug naar beginscherm
								</button>
							)}
							<button
								className="btn btn-modal btn-primary"
								onClick={navigateProducts}
								type="button"
							>
								terug naar producten
							</button>
						</div>
					</div>
				</div>
			</Wrapper>
		);
	}

	// component
	return (
		<Wrapper>
			<form onSubmit={(e) => handleNewSubmit(e)}>
				<div className="form-container">
					<div className="close-button" onClick={() => navigate("/products")}>
						<CloseIcon />
					</div>
					<div className="header">
						{newProduct ? (
							<h1>Product toevoegen</h1>
						) : (
							<h1>Product aanpassen</h1>
						)}
					</div>

					{/* naam */}
					<div className="input naam">
						<input
							type="text"
							placeholder="Naam"
							autoFocus
							onChange={(e) => setProduct({ ...product, naam: e.target.value })}
							value={product.naam}
							required
						/>
					</div>

					{/* prijs */}
					<div className="input prijs">
						<input
							type="number"
							placeholder="Prijs in centen"
							onChange={(e) =>
								setProduct({ ...product, prijs: e.target.value })
							}
							value={product.prijs}
							required
						/>
					</div>

					{/* Stuks of gewichtprijs */}
					<div className="select stuksprijs">
						<select
							id="stuksprijs"
							onChange={(e) =>
								setProduct({ ...product, stukPrijs: e.target.value })
							}
							value={product.stukPrijs}
							required
						>
							<option value="">Stuk- of gewichtprijs</option>
							<option value="stuk">Per stuk</option>
							<option value="gewicht">Per gewicht</option>
						</select>
					</div>

					{/* leverancier */}
					<div className="select leverancier">
						<select
							id="leverancier"
							required
							onChange={(e) =>
								setProduct({ ...product, leverancier: e.target.value })
							}
							value={product.leverancier}
						>
							<option value="">Leverancier</option>
							<option value="adri">Adri en zoon</option>
							<option value="volfood">Volfood</option>
							<option value="marien">Oom Marien</option>
							<option value="overig">Andere leverancier</option>
						</select>
					</div>

					{/* allergenen */}
					<div className="checkbox allergenen">
						<h4>Allergenen:</h4>
						{product.allergenen.map((item, index) => (
							<Checkbox
								key={item.name}
								isChecked={item.checked}
								checkHandler={() => updateCheckStatusAllergeen(index)}
								label={item.name}
								index={index}
							/>
						))}
					</div>

					{/* opties */}
					<div className="opties">
						<h4>Opties:</h4>
						<div className="option-items">
							{product.opties.map((vraag, i) => {
								return (
									<div className="option-item" key={i}>
										<p>{vraag.vraag}</p>
										<button type="button" onClick={() => handleDeleteOption(i)}>
											<CloseIcon />
										</button>
									</div>
								);
							})}
						</div>
						<input
							type="text"
							placeholder="Vraag"
							onChange={(e) => setVraag(e.target.value)}
							value={vraag}
						/>
						<input
							type="text"
							placeholder="Optie"
							onChange={(e) => setAntwoordOne(e.target.value)}
							value={antwoordOne}
						/>
						<input
							type="text"
							placeholder="Optie"
							onChange={(e) => setAntwoordTwo(e.target.value)}
							value={antwoordTwo}
						/>

						{antwoorden.map((data, i) => {
							return (
								<div key={i} className="dynamic-option">
									<input
										type="text"
										value={data}
										onChange={(e) => handleChange(e, i)}
										placeholder="Optie"
									/>
									<button type="button" onClick={() => handleDeleteQuestion(i)}>
										<CloseIcon />
									</button>
								</div>
							);
						})}
						<button
							type="button"
							className="add-dynamic-option"
							onClick={() => handleAdd()}
						>
							<PlusIcon />
						</button>
						<button
							type="button"
							className="add-option btn btn-primary"
							onClick={() => handleAddOptie()}
						>
							Optie toevoegen
						</button>
					</div>

					{/* categorie */}
					<div className="select categorie">
						<select
							id="categorie"
							onChange={(e) =>
								setProduct({ ...product, categorie: e.target.value })
							}
							value={product.categorie}
							required
						>
							<option value="">Selecteer een categorie</option>
							{categoryArray.map((cat, i) => {
								return (
									<option key={i} value={cat.naam}>
										{cat.naam}
									</option>
								);
							})}
						</select>
					</div>

					{/* beschrijving */}
					<div className="textarea beschrijving">
						<textarea
							name=""
							id=""
							placeholder="Beschrijving"
							onChange={(e) =>
								setProduct({ ...product, beschrijving: e.target.value })
							}
							value={product.beschrijving}
							required
						></textarea>
					</div>

					{(product.categorie === "Verse vis" ||
						product.categorie === "Verse filet" ||
						product.categorie === "Diepvries" ||
						product.categorie === "Schaal- en schelpdieren") && (
						<>
							{/* herkomst */}
							<div className="input herkomst">
								<input
									type="text"
									placeholder="Herkomst"
									onChange={(e) =>
										setProduct({ ...product, herkomst: e.target.value })
									}
									value={product.herkomst}
									required
								/>
							</div>

							{/* vangstmethode */}
							<div className="select vangstmethode">
								<select
									id="vangstmethode"
									onChange={(e) =>
										setProduct({ ...product, vangstmethode: e.target.value })
									}
									value={product.vangstmethode}
									required
								>
									<option value="">Vangstmethode</option>
									<option value="wildvang">Wildvang</option>
									<option value="aquacultuur">Aquacultuur</option>
								</select>
							</div>

							{/* gerechten */}
							<div className="checkbox gerechten">
								<h4>Gerechten:</h4>
								{product.gerechten.map((item, index) => (
									<Checkbox
										key={item.name}
										isChecked={item.checked}
										checkHandler={() => updateCheckStatusGerecht(index)}
										label={item.name}
										index={index}
									/>
								))}
							</div>

							{/* saus */}
							<div className="checkbox saus">
								<h4>Sauzen:</h4>
								{product.saus.map((item, index) => (
									<Checkbox
										key={item.name}
										isChecked={item.checked}
										checkHandler={() => updateCheckStatusSaus(index)}
										label={item.name}
										index={index}
									/>
								))}
							</div>

							{/* wijn */}
							<div className="checkbox wijn">
								<h4>Wijn:</h4>
								{product.wijn.map((item, index) => (
									<Checkbox
										key={item.name}
										isChecked={item.checked}
										checkHandler={() => updateCheckStatusWijn(index)}
										label={item.name}
										index={index}
									/>
								))}
							</div>
						</>
					)}
					<button
						type="button"
						className="annuleren btn btn-secondary"
						onClick={() => navigate("/products")}
					>
						Annuleren
					</button>
					<button className="bevestigen btn btn-primary" type="submit">
						bevestigen
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

// styling

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
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
			padding: 2rem 2rem;
			margin: 8rem 0;
			border-radius: var(--radius);
			width: 80%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
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
		}
	}
	.form-container {
		position: relative;
		margin: 2rem 0;
		padding: 2rem;
		border: 1px solid var(--clr-grey);
		border-radius: var(--radius);
		width: calc(100vw - 10rem);
		display: grid;
		grid-template-areas:
			"header header"
			"naam prijs"
			"stuksprijs leverancier"
			"categorie categorie"
			"herkomst vangstmethode"
			"beschrijving beschrijving"
			"beschrijving beschrijving"
			"beschrijving beschrijving"
			"opties opties"
			"opties opties"
			"opties opties"
			"opties opties"
			"allergenen allergenen"
			"allergenen allergenen"
			"allergenen allergenen"
			"wijn wijn"
			"wijn wijn"
			"wijn wijn"
			"saus saus"
			"saus saus"
			"gerechten gerechten"
			"gerechten gerechten"
			"annuleren bevestigen";
		grid-gap: 1rem;
		grid-template-columns: 1fr 1fr;
		h1 {
			text-align: center;
		}
		h4 {
			width: 100%;
		}
		select,
		input,
		textarea {
			border: 1px solid var(--clr-grey);
			width: 100%;
			padding: 0.5rem;
			height: 2.25rem;
		}
		textarea {
			height: 9rem;
			resize: vertical;
		}
		.checkbox {
			display: flex;
			flex-wrap: wrap;
			gap: 0.75rem;
		}
		.close-button {
			position: absolute;
			top: 8px;
			right: 8px;
		}
		.header {
			grid-area: header;
		}
		.naam {
			grid-area: naam;
		}
		.prijs {
			grid-area: prijs;
		}
		.stuksprijs {
			grid-area: stuksprijs;
		}
		.leverancier {
			grid-area: leverancier;
		}
		.herkomst {
			grid-area: herkomst;
		}
		.vangstmethode {
			grid-area: vangstmethode;
		}
		.categorie {
			grid-area: categorie;
		}
		.beschrijving {
			grid-area: beschrijving;
		}
		.opties {
			grid-area: opties;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			.dynamic-option {
				display: flex;
				button {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 2.25rem;
					width: 2.25rem;
					border: none;
					background-color: #ff4a4aad;
					padding: 4px;
				}
			}
			.add-dynamic-option {
				width: 2.25rem;
				height: 2.25rem;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				border: none;
				margin: 0 auto;
				background-color: #3ed93eae;
				padding: 4px;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
			}
			.add-option {
				width: 50%;
				margin: 0 auto;
			}
			.option-items {
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
			}
		}
		.allergenen {
			grid-area: allergenen;
		}
		.wijn {
			grid-area: wijn;
		}
		.saus {
			grid-area: saus;
		}
		.gerechten {
			grid-area: gerechten;
		}
		.annuleren {
			grid-area: annuleren;
		}
		.bevestigen {
			grid-area: bevestigen;
		}
	}
`;

export default NewProductPage;

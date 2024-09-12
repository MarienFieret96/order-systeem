import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { categorieen } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import {
	AddOption,
	AddCheck,
	AddWine,
	AddRelatedProducts,
	AddAlergenen,
	AddBereidingsWijze,
} from "../components";
import { useProductsContext } from "../context/products_context";
import { CloseIcon } from "../assets/svg";

const AddProductPage = ({ update }) => {
	const [opties, setOpties] = useState([]);
	const [checks, setChecks] = useState([]);
	const [wijn, setWijn] = useState([]);
	const [allergeen, setAllergeen] = useState([]);
	const [related, setRelated] = useState([]);
	const [bereidingsWijze, setBereidingsWijze] = useState([]);
	const { register, handleSubmit, watch, reset, setValue } = useForm({
		defaultValues: {
			naam: "",
			prijs: "",
			gemiddeldGewicht: "",
			productOpmerking: "",
			leverancier: "adri",
			perStuk: "gewicht",
			categorie: "Verse vis",
			herkomst: "",
			vangstmethode: "wildvang",
			bewaarAdvies: "",
		},
	});
	const navigate = useNavigate();
	const { createProduct, updateProduct, loading, state_product } =
		useProductsContext();

	const resetState = () => {
		setOpties([]);
		setChecks([]);
		setWijn([]);
		setAllergeen([]);
		setRelated([]);
		setBereidingsWijze([]);
	};

	const onSubmit = (data) => {
		const perStuk = data.perStuk === "stuk";
		const newProductObject = {
			naam: data.naam,
			prijs: {
				perStuk,
				prijs: data.prijs,
				gemiddeldGewicht: data.gemiddeldGewicht,
			},
			beschrijving: data.productOpmerking,
			leverancier: data.leverancier,
			allergenen: allergeen,
			opties: {
				select: opties,
				check: checks,
			},
			categorie: data.categorie,
			herkomst: data.herkomst,
			vangstmethode: data.vangstmethode,
			wijn: wijn,
			relatedProducts: related,
			bereidingsWijze: bereidingsWijze,
			bewaarAdvies: data.bewaaradvies,
		};
		if (update) {
			updateProduct(newProductObject, state_product._id);
			navigate("/products");
		} else {
			const newProduct = createProduct(newProductObject);
			if (!newProduct) return;
			reset({
				naam: "",
				prijs: "",
				gemiddeldGewicht: "",
				productOpmerking: "",
				leverancier: "adri",
				perStuk: "gewicht",
				categorie: "Verse vis",
				herkomst: "",
				vangstmethode: "wildvang",
				bewaaradvies: "",
			});
			resetState();
		}
	};

	const handleBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (update) {
			let perStuk = "";
			if (state_product.prijs.perStuk) {
				perStuk = "stuk";
			} else {
				perStuk = "gewicht";
			}
			setValue("naam", state_product.naam);
			setValue("prijs", state_product.prijs.prijs);
			setValue("gemiddeldGewicht", state_product.prijs.gemiddeldGewicht);
			setValue("productOpmerking", state_product.productOpmerking);
			setValue("leverancier", state_product.leverancier);
			setValue("perStuk", perStuk);
			setValue("categorie", state_product.categorie);
			setValue("herkomst", state_product.herkomst);
			setValue("vangstmethode", state_product.vangstmethode);
			setValue("bewaaradvies", state_product.bewaarAdvies);
			setOpties(state_product.opties.select);
			setChecks(state_product.opties.check);
			setWijn(state_product.wijn);
			setRelated(state_product.relatedProducts);
			setBereidingsWijze(state_product.bereidingsWijze);
			setAllergeen(state_product.allergenen);
			setWijn(state_product.wijn);
		}
	}, []);

	const watchCategory = watch("categorie");

	const herkomstCheck =
		watchCategory === "Verse vis" ||
		watchCategory === "Verse filet" ||
		watchCategory === "Diepvries" ||
		watchCategory === "Oesters" ||
		watchCategory === "Schaal- en schelpdieren" ||
		watchCategory === "Gerookte vis";
	const bereidCheck =
		watchCategory === "Verse vis" ||
		watchCategory === "Verse filet" ||
		watchCategory === "Maaltijden" ||
		watchCategory === "Soepen" ||
		watchCategory === "Diepvries";
	const wijnCheck =
		watchCategory === "Verse vis" || watchCategory === "Verse filet";

	return (
		<Wrapper>
			<form
				spellCheck="false"
				onSubmit={handleSubmit(onSubmit)}
				id="add-product"
				name="add-product"
			>
				<div className="close-button" onClick={handleBack}>
					<CloseIcon />
				</div>
				<h1>Product {update ? "wijzigen" : "toevoegen"}</h1>
				<div className="row">
					<input
						type="text"
						required
						placeholder="Naam"
						{...register("naam", { min: 1 })}
					/>
					<input
						type="number"
						required
						placeholder="Prijs in centen"
						{...register("prijs", { min: 1 })}
					/>
				</div>
				<div className="row">
					<select {...register("perStuk")}>
						<option value="gewicht">per gewicht</option>
						<option value="stuk">per stuk</option>
					</select>
					<input
						type="number"
						placeholder="Gemiddeld gewicht"
						{...register("gemiddeldGewicht")}
					/>
				</div>
				<div className="row">
					<select {...register("leverancier")}>
						<option value="adri">Adri</option>
						<option value="marien">Oom Marien</option>
						<option value="volfood">Volfood</option>
						<option value="other">Andere Leverancier</option>
					</select>
					<select {...register("categorie")}>
						{categorieen.map((item, index) => {
							return (
								<option key={index} value={item}>
									{item}
								</option>
							);
						})}
					</select>
				</div>
				{herkomstCheck && (
					<div className="row">
						<input
							type="text"
							placeholder="Herkomst"
							{...register("herkomst")}
						/>
						<select {...register("vangstmethode")}>
							<option value="wildvang">Wildvang</option>
							<option value="aquacultuur">Aquacultuur</option>
						</select>
					</div>
				)}
				<div className="row">
					<input
						type="text"
						id="bewaaradvies"
						naam="bewaaradvies"
						placeholder="Bewaaradvies"
						{...register("bewaaradvies")}
					/>
				</div>

				<div className="row">
					<textarea
						name="beschrijving"
						id="beschrijving"
						placeholder="Beschrijving"
						rows="2"
						{...register("productOpmerking", {
							min: 1,
						})}
					></textarea>
				</div>
				<AddRelatedProducts related={related} setRelated={setRelated} />
				{bereidCheck && (
					<AddBereidingsWijze
						bereidingsWijze={bereidingsWijze}
						setBereidingsWijze={setBereidingsWijze}
					/>
				)}
				<AddCheck checks={checks} setChecks={setChecks} />
				<AddOption opties={opties} setOpties={setOpties} />
				{wijnCheck && <AddWine wijn={wijn} setWijn={setWijn} update={update} />}

				<AddAlergenen
					allergeen={allergeen}
					setAllergeen={setAllergeen}
					update={update}
				/>
				<div className="row final">
					<button
						className="btn btn-secondary"
						type="button"
						onClick={handleBack}
					>
						Annuleren
					</button>
					<button type="submit" className="btn btn-primary" disabled={loading}>
						Product {update ? "wijzigen" : "toevoegen"}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 1rem;
	form {
		.close-button {
			position: absolute;
			top: 1rem;
			right: 1rem;
		}
		h1 {
			text-align: center;
			margin-bottom: 1rem;
		}
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid var(--clr-grey);
		border-radius: var(--radius);
		padding: 2rem;
		.row {
			display: flex;
			width: 100%;
			gap: 1rem;

			input,
			select,
			textarea {
				width: 100%;
				padding: 0.5rem;
			}
			textarea {
				height: 136px;
				resize: vertical;
			}
			button {
				margin: 0;
			}
		}
		.opties {
			display: flex;
			flex-direction: column;
			.dynamic-option {
				display: flex;
				height: 34px;
				input {
					border-radius: var(--radius) 0 0 var(--radius);
				}
				.dynamic-option-delete {
					border-radius: 0 var(--radius) var(--radius) 0;
					border: 1px solid silver;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #ff4a4aad;
					width: 34px;
					svg {
						padding: 2px;
					}
				}
			}
			.add-dynamic-option {
				width: 40px;
				height: 40px;
				border-radius: 999px;
				display: flex;
				justify-content: center;
				align-items: center;
				border: none;
				background-color: #3ed93eae;
				padding: 4px;
				align-self: center;
			}
			.add-option {
				width: 50%;
				align-self: center;
			}
		}
		.checks {
			display: flex;
			flex-direction: column;
			.row {
				display: flex;
				button {
					height: 34px;
					margin: 0;
				}
			}
		}
		.option-items {
			display: flex;
			gap: 1rem;
			flex-wrap: wrap;
			.option-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 0.5rem;
				padding: 0.375rem 0.75rem;
				height: 34px;
				background-color: var(--clr-light-grey);
				border: 1px solid silver;
				border-radius: var(--radius);
				text-transform: capitalize;
				button {
					width: 34px;
					height: 34px;
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
		.checkbox {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			h4 {
				width: 100%;
				margin-bottom: 0.5rem;
			}
		}
		.final button {
			margin-top: 1rem;
			width: 100%;
		}
	}
`;

export default AddProductPage;

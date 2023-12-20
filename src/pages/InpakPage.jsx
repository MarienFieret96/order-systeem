import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";

const ProductCard = ({ item, openModal }) => {
	const [open, setOpen] = useState(false);

	const { _id, producten } = item;
	const firstProduct = producten[0];
	return (
		<div className="container">
			<div className="initial-info">
				<h2>{firstProduct.naam}</h2>
				<div className="row left">
					<p>
						<span>Inpakdatum:</span>
					</p>
					<p>{firstProduct.inpakdatum}</p>
				</div>
				<div className="row right">
					<p>
						<span>Houdbaar tot:</span>
					</p>
					<p>{firstProduct.houdbaarheidsdatum}</p>
				</div>
				<div className="row left">
					<p>
						<span>Ingepakt door:</span>
					</p>
					<p>{firstProduct.ingepaktDoor}</p>
				</div>
				<div className="row right">
					<p>
						<span>Aantal:</span>
					</p>
					<p>{firstProduct.aantalIngepakt}</p>
				</div>
			</div>
			{open && (
				<div className="extra-info">
					<div className="row">
						<h4>Inpakdatum</h4>
						<h4>Houdbaarheid</h4>
						<h4>Ingepakt door</h4>
						<h4>Aantal</h4>
					</div>
					{producten.map((product, index) => {
						const {
							inpakdatum,
							houdbaarheidsdatum,
							ingepaktDoor,
							aantalIngepakt,
						} = product;
						if (index === 0) return;
						return (
							<div className="row" key={index}>
								<p>{inpakdatum}</p>
								<p>{houdbaarheidsdatum}</p>
								<p>{ingepaktDoor}</p>
								<p>{aantalIngepakt}</p>
							</div>
						);
					})}
				</div>
			)}

			<div className="buttons">
				<button className="btn btn-secondary" onClick={() => setOpen(!open)}>
					{open ? "Minder" : "Meer"} weergeven
				</button>
				<button
					className="btn btn-primary"
					onClick={() => openModal(firstProduct.naam, _id)}
				>
					Inpakken
				</button>
			</div>
		</div>
	);
};

const InpakPage = () => {
	const baseDate = () => {
		let today = new Date();
		return today;
	};
	const data = [
		{
			_id: "465465461312",
			producten: [
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
			],
		},
		{
			_id: "46546546asdf2",
			producten: [
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
			],
		},
		{
			_id: "465465461312",
			producten: [
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "gerookte forel",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
			],
		},
		{
			_id: "46546546asdf2",
			producten: [
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
				{
					naam: "paella",
					inpakdatum: "1/21/2023",
					houdbaarheidsdatum: "9/21/2023",
					ingepaktDoor: "Gertrude",
					aantalIngepakt: 6,
				},
			],
		},
	];
	const personeel = [
		"Gijsbert",
		"Marleen",
		"Gertrude",
		"Marilène",
		"Laura",
		"Janneke",
		"Jeanita",
		"Brenda",
		"Esther",
		"Marien",
		"Erica",
		"Sophie",
		"Tom",
		"Reinier",
	];
	const [modal, setModal] = useState(false);
	const [inpakDatum, setInpakDatum] = useState(baseDate());
	const [houdbaarheidsDatum, setHoudbaarheidsDatum] = useState(baseDate());
	const [totaalIngepakt, setTotaalIngepakt] = useState(0);
	const [ingepaktDoor, setIngepaktDoor] = useState("Gertrude");
	const [product, setProduct] = useState("");
	const [id, setId] = useState("");

	const openModal = (product, _id) => {
		setProduct(product);
		setId(_id);
		setModal(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let newObject = {
			_id: id,
			producten: {
				naam: product,
				inpakDatum,
				houdbaarheidsDatum,
				ingepaktDoor,
				totaalIngepakt,
			},
		};
		console.log(newObject);
	};

	return (
		<Wrapper>
			<div className="wrapper">
				{data.map((item, index) => {
					return <ProductCard key={index} item={item} openModal={openModal} />;
				})}
			</div>
			{modal && (
				<div className="modal-container">
					<div className="overlay"></div>
					<div className="modal">
						<h2>{product} Inpakken</h2>
						<form onSubmit={(e) => handleSubmit(e)}>
							{/* inpakdatum */}
							<div className="content">
								<div className="input">
									<h5>Houdbaarheidsdatum:</h5>
									<DatePicker
										minDate={new Date()}
										selected={inpakDatum}
										onChange={(inpakDatum) => setInpakDatum(inpakDatum)}
										dateFormat="dd MMMM"
										locale={nl}
									/>
								</div>
								<div className="input">
									<h5>Inpakdatum:</h5>
									<DatePicker
										selected={houdbaarheidsDatum}
										onChange={(houdbaarheidsDatum) =>
											setHoudbaarheidsDatum(houdbaarheidsDatum)
										}
										dateFormat="dd MMMM"
										locale={nl}
										filterDate={(houdbaarheidDate) =>
											houdbaarheidDate.getDay() !== 0 &&
											houdbaarheidDate.getDay() !== 1
										}
									/>
								</div>
								{/* hoeveelheid */}
								<div className="input">
									<h4>Hoeveelheid:</h4>
									<input
										type="number"
										value={totaalIngepakt}
										onChange={(e) => setTotaalIngepakt(e.target.value)}
									/>
								</div>
								{/* ingepakt door */}
								<div className="input">
									<h4>Ingepakt door:</h4>
									<select
										name="personeel"
										id=""
										onChange={(e) => setIngepaktDoor(e.target.value)}
										value={ingepaktDoor}
									>
										{personeel.map((item, index) => {
											return (
												<option key={index} value={item}>
													{item}
												</option>
											);
										})}
									</select>
								</div>
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setModal(false)}
								>
									Annuleren
								</button>
								<button className="btn btn-primary">Opslaan</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	position: relative;
	.modal-container {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.overlay {
			height: 100%;
			width: 100%;
			background-color: #0000006b;
			position: absolute;
		}
		.modal {
			margin-inline: auto;
			width: calc(100% - 12rem);
			padding: 2rem;

			border: 1px solid var(--clr-grey);
			border-radius: var(--radius);
			background-color: var(--clr-light-grey);
			box-shadow: var(--light-shadow);
			z-index: 999;
			h2 {
				text-align: center;
				margin-bottom: 2rem;
			}
			.content {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1rem;
				input,
				select {
					border: 1px solid var(--clr-grey);
					width: 100%;
					padding: 0.5rem;
					height: 2.25rem;
				}
				h5 {
					margin-bottom: 0.5rem;
				}
				button {
					margin-top: 1rem;
				}
			}
		}
	}
	.wrapper {
		margin-inline: auto;
		width: calc(100% - 8rem);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		.container {
			padding: 2rem 4rem;
			border: 1px solid var(--clr-grey);
			border-radius: var(--radius);
			background-color: var(--clr-light-grey);
			box-shadow: var(--light-shadow);
			.initial-info {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1rem;
				.row {
					display: flex;
					justify-content: space-between;
					span {
						font-weight: bold;
						display: inline-block;
						margin-right: auto;
					}
				}
				.left {
					margin-right: 1.5rem;
				}
				.right {
					margin-left: 1.5rem;
				}
				h2 {
					text-align: center;
					grid-column: span 2;
					text-transform: capitalize;
				}
			}
			.extra-info {
				margin-top: 2rem;
				padding: 1rem 0;
				display: flex;
				flex-direction: column;

				border-top: 1px solid var(--clr-grey);
				border-bottom: 1px solid var(--clr-grey);
				.row {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr 0.5fr;
					gap: 0.5rem;
					border-top: 1px solid var(--clr-grey);
					padding: 0.5rem 0;
					h4,
					p {
						text-align: center;
					}
				}
				.row:first-child {
					border: none;
				}
			}
			.buttons {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1rem;
				margin: 1rem auto 0 auto;
				.btn {
					padding: 0.75rem 1rem;
				}
			}
		}
	}
`;

export default InpakPage;

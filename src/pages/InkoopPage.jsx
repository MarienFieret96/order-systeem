import React, { useState } from "react";
import styled from "styled-components";
import { ForwardIcon } from "../assets/svg/ForwardIcon";

const AdriLijst = () => {
	const inkooplijst = [
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
		"Zalmfilet E-Trim 4/5",
		"Kabeljauwfilet grof 900/1300",
	];

	return (
		<div className="content-wrapper">
			<h1>Adri en Zoon</h1>
			<ul>
				{inkooplijst.map((item, index) => {
					return <li key={index}>{item}</li>;
				})}
			</ul>
		</div>
	);
};
const VolfoodLijst = () => {
	const inkooplijst = [
		"Haringsalade",
		"Haring met dille salade",
		"Smikkelpot",
		"Basis vissalade",
		"Atlantis salade",
		"Haringsalade",
		"Haring met dille salade",
		"Smikkelpot",
		"Basis vissalade",
		"Atlantis salade",
		"Haringsalade",
		"Haring met dille salade",
		"Smikkelpot",
		"Basis vissalade",
		"Atlantis salade",
	];
	return (
		<div className="content-wrapper">
			<h1>Volfood</h1>
			<ul>
				{inkooplijst.map((item, index) => {
					return <li key={index}>{item}</li>;
				})}
			</ul>
		</div>
	);
};
const MarienLijst = () => {
	const inkooplijst = [
		"Gerookte makrelen",
		"Palingfilet",
		"Forelfilet",
		"Noorse garnalen",
		"Rivierkreeftvlees",
		"Staartgarnalen",
		"Uitjes",
	];
	return (
		<div className="content-wrapper">
			<h1>Oom Marien</h1>
			<ul>
				{inkooplijst.map((item, index) => {
					return <li key={index}>{item}</li>;
				})}
			</ul>
		</div>
	);
};
const BarneveldLijst = () => {
	const inkooplijst = [
		"Kibbelingbakjes",
		"Lekkerbekbakjes",
		"Ersatzpapier",
		"Inpakpapier",
		"Kibbelingzakken groot",
		"Kibbelzakken klein",
		"Vacuumzakken 100/150",
		"Vacuumzakken 150/250",
		"Vacuumzakken 300/400",
	];
	return (
		<div className="content-wrapper">
			<h1>Van Barneveld</h1>
			<ul>
				{inkooplijst.map((item, index) => {
					return <li key={index}>{item}</li>;
				})}
			</ul>
		</div>
	);
};

const InkoopPage = () => {
	const [inkoopLijst, setInkoopLijst] = useState("adri");

	const lookup = {
		adri: AdriLijst,
		volfood: VolfoodLijst,
		marien: MarienLijst,
		barneveld: BarneveldLijst,
	};

	const LijstComponent = lookup[inkoopLijst];

	return (
		<Wrapper>
			<div className="wrapper">
				<div className="sidebar">
					<div
						className={inkoopLijst === "adri" ? "button active" : "button"}
						onClick={() => setInkoopLijst("adri")}
					>
						<h4>Adri en Zoon</h4>
						<ForwardIcon />
					</div>
					<div
						className={inkoopLijst === "volfood" ? "button active" : "button"}
						onClick={() => setInkoopLijst("volfood")}
					>
						<h4>Volfood</h4>
						<ForwardIcon />
					</div>
					<div
						className={inkoopLijst === "marien" ? "button active" : "button"}
						onClick={() => setInkoopLijst("marien")}
					>
						<h4>Oom Marien</h4>
						<ForwardIcon />
					</div>
					<div
						className={inkoopLijst === "barneveld" ? "button active" : "button"}
						onClick={() => setInkoopLijst("barneveld")}
					>
						<h4>van Barneveld</h4>
						<ForwardIcon />
					</div>
				</div>
				<div className="content">
					<LijstComponent />
				</div>
			</div>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	position: relative;
	border-top: 1px solid var(--clr-grey);
	height: calc(100vh - 5rem - 1px);
	overflow: hidden;
	.wrapper {
		display: flex;
		height: 100%;
		.sidebar {
			width: 200px;
			height: 100vh;
			overflow-y: hidden;
			border-right: 1px solid var(--clr-grey);
			.button {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100px;
				padding-left: 1.5rem;
				border-bottom: 1px solid var(--clr-grey);
			}
			.active {
				background-color: var(--clr-light-grey);
			}
		}
		.content {
			width: 100%;
			overflow-y: scroll;
			padding: 2rem;
			h1 {
				margin-bottom: 2rem;
			}
			ul li {
				margin-bottom: 1rem;
				font-size: 1.25rem;
				list-style: none;
			}
		}
	}
`;

export default InkoopPage;

import React, { useState } from "react";
import styled from "styled-components";
import { ForwardIcon } from "../assets/svg/ForwardIcon";
import {
	InstructieLijsten,
	TakenLijst,
	VeelGesteldeVragen,
} from "../components";

const RoosterLijst = () => {
	const now = new Date();
	const onejan = new Date(now.getFullYear(), 0, 1);
	const week =
		Math.ceil(
			((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7,
		) - 1;

	const evenWeek = week % 2 === 0;

	return (
		<div className="content">
			<h1>Rooster</h1>
			<h2>Weeknummer {week}</h2>
			<div className="days">
				<div className="day">
					<h3>Dinsdag</h3>
					<ul>
						<li>Gijsbert</li>
						<li>Janneke</li>
						<li>Gertrude</li>
						<li>Laura</li>
						<li>Marleen</li>
					</ul>
				</div>
				<div className="day">
					<h3>Woensdag</h3>
					<ul>
						<li>Gijsbert</li>
						<li>Jeanita</li>
						{evenWeek ? <li>Marilène</li> : <li>Gertrude</li>}

						<li>Laura</li>
						<li>Marleen</li>
					</ul>
				</div>
				<div className="day">
					<h3>Donderdag</h3>
					<ul>
						<li>Marilène</li>
						<li>Brenda</li>
						<li>Jeanita</li>
						<li>Laura</li>
						<li>Marleen</li>
					</ul>
				</div>
				<div className="day">
					<h3>Vrijdag</h3>
					<ul>
						<li>Gijsbert</li>
						<li>Marleen</li>
						<li>Gertrude</li>
						<li>Laura</li>
						<li>Brenda</li>
						<li>Esther</li>
						<li>Marien</li>
						<li>Marilène</li>
					</ul>
				</div>
				<div className="day">
					<h3>Zaterdag</h3>
					<ul>
						<li>Gijsbert</li>
						{evenWeek ? <li>Gertrude</li> : <li>Marien</li>}
						<li>Marilène</li>
						<li>Erica</li>
						<li>Tom</li>
						<li>Reinier</li>
						<li>Sophie</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

const RoosterPage = () => {
	const [tab, setTab] = useState("faq");

	const lookup = {
		faq: VeelGesteldeVragen,
		instructie: InstructieLijsten,
		rooster: RoosterLijst,
		taken: TakenLijst,
	};

	const LijstComponent = lookup[tab];
	return (
		<Wrapper>
			<div className="wrapper">
				<div className="sidebar">
					<div
						className={tab === "faq" ? "button active" : "button"}
						onClick={() => setTab("faq")}
					>
						<h4>Veel gestelde vragen</h4>
						<ForwardIcon />
					</div>
					<div
						className={tab === "instructie" ? "button active" : "button"}
						onClick={() => setTab("instructie")}
					>
						<h4>Instructie lijsten</h4>
						<ForwardIcon />
					</div>
					<div
						className={tab === "rooster" ? "button active" : "button"}
						onClick={() => setTab("rooster")}
					>
						<h4>Rooster</h4>
						<ForwardIcon />
					</div>
					<div
						className={tab === "taken" ? "button active" : "button"}
						onClick={() => setTab("taken")}
					>
						<h4>Takenlijst</h4>
						<ForwardIcon />
					</div>
				</div>

				<LijstComponent />
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
			min-width: 200px;
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
			padding: 2rem;
			h1 {
				margin-bottom: 2rem;
			}
			ul li {
				margin-bottom: 1rem;
				font-size: 1.25rem;
				list-style: none;
			}
			h2 {
				margin-bottom: 1rem;
			}

			.days {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 1rem;
				.day {
					width: 100%;
					padding: 1rem;
					border: 1px solid var(--clr-grey);
					border-radius: var(--radius);
					box-shadow: var(--light-shadow);
					h3 {
						margin-bottom: 1rem;
					}
				}
			}
		}
	}
`;

export default RoosterPage;

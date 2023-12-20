import React, { useState } from "react";
import styled from "styled-components";

const Zalmrol = () => {
	return (
		<div className="content-wrapper">
			<h2>Zalmrolletjes met panga</h2>
			<h4>Benodigdheden</h4>
			<p>4 rolletjes per bakje</p>
			<p>275 gram panga</p>
			<p>95 gram zalm</p>
			<h4>Instructies</h4>
			<ul>
				<li>Panga in 3 repen snijden</li>
				<li>50 gram vissaus + citroenpeper in een ovenschaaltje</li>
				<li>Binnenkant van panga bestrijken met Italiaanse marinade</li>
				<li>Oprollen en vastzetten met een prikkertje</li>
			</ul>
			<br />
			<p>
				<span>Bereidingstijd:</span> 20 minuten op 180 graden celcius
			</p>
		</div>
	);
};
const Stoofpot = () => {
	return <h1>stoffpot</h1>;
};
const Ovenschotel = () => {
	return <h1>ovenschotel</h1>;
};
const Schelvisschotel = () => {
	return <h1>schelvisschotel</h1>;
};
const Lasagne = () => {
	return <h1>lasagna</h1>;
};
const Paella = () => {
	return <h1>paella</h1>;
};
const Mihoen = () => {
	return <h1>mihoen</h1>;
};
const Visschotel = () => {
	return <h1>visschotel</h1>;
};
const Kassa = () => {
	return <h1>kassa</h1>;
};

const InstructieLijsten = () => {
	const [tab, setTab] = useState("zalmrol");
	const menuLinks = [
		{
			link: "zalmrol",
			title: "Zalmrolletjes met panga",
		},
		{
			link: "stoofpot",
			title: "Oma's stoofpot",
		},
		{
			link: "ovenschotel",
			title: "Zalm en Kabeljauw ovenschotel",
		},
		{
			link: "schelvisschotel",
			title: "Schelvis schotel",
		},
		{
			link: "lasagna",
			title: "Lasagna",
		},
		{
			link: "paella",
			title: "Paella",
		},
		{
			link: "mihoen",
			title: "Mihoen",
		},
		{
			link: "visschotel",
			title: "Visschotel",
		},
		{
			link: "kassa",
			title: "Product toevoegen",
		},
	];
	const lookup = {
		mihoen: Mihoen,
		paella: Paella,
		lasagna: Lasagne,
		schelvisschotel: Schelvisschotel,
		ovenschotel: Ovenschotel,
		stoofpot: Stoofpot,
		zalmrol: Zalmrol,
		kassa: Kassa,
		visschotel: Visschotel,
	};
	const RenderComponent = lookup[tab];
	return (
		<Wrapper>
			<div className="nav-menu">
				{menuLinks.map((item, index) => {
					return (
						<div
							key={index}
							className={tab === item.link ? "button active" : "button"}
							onClick={() => setTab(item.link)}
						>
							<h4>{item.title}</h4>
						</div>
					);
				})}
			</div>
			<RenderComponent />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	position: relative;
	.nav-menu {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		.button {
			flex: 1;
			display: flex;
			justify-content: center;
			height: 75px;
			align-items: center;
			text-align: center;
			border: 1px solid var(--clr-grey);
		}
		.active {
			background-color: var(--clr-light-grey);
		}
	}
	.content-wrapper {
		height: 100%;
		padding: 2rem;
		overflow-y: scroll;
		padding-bottom: 10rem;
		h2 {
			margin-bottom: 2rem;
		}
		h4 {
			margin: 1rem 0;
		}
		p,
		li {
			margin-bottom: 0.5rem;
		}
		ul {
			padding-left: 2rem;
		}
		span {
			color: var(--clr-accent);
		}
	}
`;

export default InstructieLijsten;

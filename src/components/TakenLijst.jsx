import React, { useState } from "react";
import styled from "styled-components";

const Maandag = () => {
	return (
		<div className="content-wrapper">
			<h2>Maandag</h2>
			<h4>Ochtend</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
			<br />
			<h4>Avond</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
		</div>
	);
};
const Dinsdag = () => {
	return (
		<div className="content-wrapper">
			<h2>Dinsdag</h2>
			<h4>Ochtend</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
			<br />
			<h4>Avond</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
		</div>
	);
};
const Woensdag = () => {
	return (
		<div className="content-wrapper">
			<h2>Woensdag</h2>
			<h4>Ochtend</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
			<br />
			<h4>Avond</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
		</div>
	);
};
const Donderdag = () => {
	return (
		<div className="content-wrapper">
			<h2>Donderdag</h2>
			<h4>Ochtend</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
			<br />
			<h4>Avond</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
		</div>
	);
};
const Vrijdag = () => {
	return (
		<div className="content-wrapper">
			<h2>Vrijdag</h2>
			<h4>Ochtend</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
			<br />
			<h4>Avond</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
		</div>
	);
};
const Zaterdag = () => {
	return (
		<div className="content-wrapper">
			<h2>Zaterdag</h2>
			<h4>Ochtend</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
			<br />
			<h4>Avond</h4>
			<p>taak 1</p>
			<p>taak 2</p>
			<p>taak 3</p>
		</div>
	);
};

const TakenLijst = () => {
	const [tab, setTab] = useState("maandag");
	const menuLinks = [
		{
			link: "maandag",
			title: "Maandag",
		},
		{
			link: "dinsdag",
			title: "Dinsdag",
		},
		{
			link: "woensdag",
			title: "Woensdag",
		},
		{
			link: "donderdag",
			title: "Donderdag",
		},
		{
			link: "vrijdag",
			title: "Vrijdag",
		},
		{
			link: "zaterdag",
			title: "Zaterdag",
		},
	];
	const lookup = {
		maandag: Maandag,
		dinsdag: Dinsdag,
		woensdag: Woensdag,
		donderdag: Donderdag,
		vrijdag: Vrijdag,
		zaterdag: Zaterdag,
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
		height: 100px;
		display: flex;
		border-bottom: 1px solid var(--clr-grey);
		/* box-shadow: var(--light-shadow); */
		.button {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			border-right: 1px solid var(--clr-grey);
		}
		.active {
			background-color: var(--clr-light-grey);
		}
	}
	.content-wrapper {
		height: 100%;
		padding: 1rem 2rem;
		overflow-y: scroll;
		padding-bottom: 10rem;
		h2 {
			margin-bottom: 1rem;
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

export default TakenLijst;

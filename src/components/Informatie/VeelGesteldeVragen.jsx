import React, { useState } from "react";
import styled from "styled-components";

const PortieGroottes = () => {
	return (
		<div className="content-wrapper">
			<h2>Portiegroottes per persoon</h2>
			<p>
				Dit zijn richtlijnen. Voor kleinere eters pas je dit aan naar onder en
				vice versa.
			</p>
			<p>Filet: 150 - 200 gram</p>
			<p>Hele vis: 300 - 500 gram</p>
			<p>Voorgerecht: 50 - 100 gram</p>
			<p>Sushi/Pokebowl: 100 - 125 gram</p>
			<p>Paëlla / mihoen: 350 - 400 gram</p>
			<p>Roerbakschotel: 250 gram</p>
			<p>Soep: &#40;voorgerecht&#41; 250 ml</p>
			<br />
			<h2>Kibbeling</h2>
			<p>1 persoon: 175 gram.</p>
			<p>2 personen: 350 gram.</p>
			<p>3 personen: 500 gram.</p>
			<p>4 personen: 700 gram.</p>
			<p>
				Voor grotere hoeveelheden kan je de bovengenoemde hoeveelheden bij
				elkaar optellen.
			</p>
			<p>
				Bijv. 7 personen = 4 personen + 3 personen = 700 gram + 500 gram = 1200
				gram.
			</p>
			<br />
			<p>
				Voor hoeveelheden met kinderen vraag hoeveel de kinderen eten relatief
				tot de volwassene. Vaak is dit ongeveer de helft.
			</p>
			<p>
				Bijv. 2 volwassenen en 3 kinderen = 2 personen + 1.5 persoon = 350 gram
				+ 250 à 300 gram = 600 à 650 gram.
			</p>
			<br />
			<p>Portiebakje met / zonder saus: ca. 220 gram / 200 gram.</p>
			<p>Grote portiebak met / zonder saus: ca. 370 gram / 290 gram.</p>
			<br />
			<p>Saus: ca. 1 pompje per 100 gram kibbeling.</p>
		</div>
	);
};
const BereidingsWijzen = () => {
	return (
		<div className="content-wrapper">
			<h2>Bakken</h2>
			<ul>
				<li>Dep de vis droog met keukenpapier.</li>
				<li>Bestrooi met citroen, peper & zout.</li>
				<li>Wentel de vis door bloem.</li>
				<li>Bak beide zijden mooi bruin.</li>
			</ul>
			<br />
			<p>
				<span>Bereidingstijd:</span> Voor platvis zoals schol 8 - 10 minuten.
			</p>
			<p>Voor hele vis zoals zeebaars 10 - 12 minuten.</p>
			<p>Voor filets met de dikte van zeebaars of scholfilet 3 - 5 minuten.</p>
			<p>Voor filets met de dikte van heekfilet of panga 5 - 7 minuten.</p>
			<p>Voor filets met de dikte van kabeljauw 8 - 10 minuten.</p>
			<p>Altijd op middelmatig vuur.</p>
			<br />
			<h2>Oven</h2>
			<ul>
				<li>Verwarm de oven voor op 180 graden celcius.</li>
				<li>Bestrooi met citroen, peper & zout.</li>
				<li>Voeg eventueel een klontje boter toe.</li>
			</ul>
			<br />
			<p>
				<span>Bereidingstijd:</span> ca. 20 minuten.
			</p>
			<br />
			<h2>Roerbakken</h2>
			<p>
				Werkt het beste met stevige soorten zoals kabeljauw, poon, panga, leng
				of garnalen.
			</p>
			<ul>
				<li>Verhit de wok alvast voor en voeg daarna een scheutje olie toe.</li>
				<li>Zet het vuur hoog en verdeel de olie over de hele pan.</li>
				<li>
					Zodra de olie heel licht walmt kunnen smaakmakers zoals ui en knoflook
					erdoor.
				</li>
				<li>
					Als de knoflook gaat geuren kan de vis erbij. Voeg naar smaak groenten
					toe en schep het geheel om.
				</li>
				<li>
					Voeg een woksaus toe zodra de vis en groenten nagenoeg gaar zijn.
				</li>
			</ul>
			<br />
			<p>
				<span>Bereidingstijd:</span> ca. 5 - 7 minuten.
			</p>
			<br />
			<h2>Grillen & BBQ</h2>
			<ul>
				<li>Dep de vis droog met keukenpapier.</li>
				<li>
					Besprenkel de vis met 1 eetlepel citroensap en bestrijk ze rondom met
					2 eetlepels olie. Laat ze zo ca. 5 minuten liggen
				</li>
				<li>
					Verhit de grillpan op een hoge stand tot de pan echt gloeiend heet is.
					Bestrijk de ribbels dun met olijfolie.
				</li>
				<li>Leg de stukken vis in de grillpan en rooster ze 4-5 minuten.</li>
				<li>
					Controleer of de stukken vis vanzelf van de ribbels loslaten en keer
					ze pas dan voorzichtig met 2 spatels.
				</li>
				<li>
					Rooster de stukken vis in nog 4-5 minuten aan de onderkant bruin en
					van binnen net gaar. Leg de geroosterde vis op de borden en strooi er
					zout en peper over.
				</li>
			</ul>
			<br />
			<p>
				<span>Bereidingstijd:</span> Hele vis: ca. 15 - 20 minuten. Filet: ca. 8
				- 10 minuten.
			</p>

			<br />
			<h2>Magnetron</h2>
			<p>Gebruik maximaal 400 watt om de vis niet te droog te maken</p>
			<ul>
				<li>Leg de vis in een ondiepe schaal.</li>
				<li>
					Voeg wat vocht toe, bijvoorbeeld citroensap en eventueel wat
					visbouillon.
				</li>
				<li>Dek de schaal af.</li>
			</ul>
			<br />
			<p>
				<span>Bereidingstijd:</span> Hele vis: ca. 4 - 6 minuten. Filet: ca. 2 -
				3 minuten.
			</p>
			<br />
			<h2>Pocheren</h2>
			<p>
				Werkt het beste voor zachte vissoorten zoals schelvis maar kan met alle
				soorten.
			</p>
			<ul>
				<li>
					Bren in een lage pan bouillon en/of wijn met kruiden tegen de kook
					aan.
				</li>
				<li>
					Pocheer de vis 6 minuten per 2cm dikte. Het water mag niet koken.
				</li>
				<li>
					De vis in de pan leggen en eruit nemen doe je met een schuimspaan.
				</li>
			</ul>
			<br />
			<p>
				<span>Bereidingstijd:</span> ca. 4 - 8 minuten.
			</p>
			<br />
			<h2>Frituren</h2>
			<ul>
				<li>Bestrooi de vis met peper, zout en citroensap.</li>
				<li>Haal de vis door een beslag van bloem, melk en ei.</li>
				<li>Frituur de vis op 180 graden celcius.</li>
				<li>Frituur in kleine porties om de temperatuur te behouden</li>
			</ul>
			<br />
			<p>
				<span>Bereidingstijd:</span> Hele vis: ca. 6 - 8 minuten. Filet: 4 - 5
				minuten.
			</p>
			<br />
			<h2>Ceviche</h2>
			<p>Gebruik voor dit gerecht een vissoort die je rauw kunt eten.</p>
			<ul>
				<li>Snijd de vis in kleine blokjes.</li>
				<li>Marineer de vis in een mengsel van limoen, peper en knoflook.</li>
				<li>Serveer snel na bereiden zodat de vis niet doorgaard.</li>
			</ul>
			<br />
			<p>
				<span>Bereidingstijd:</span> 2 minuten voor zachtere vissoorten, 4
				minuten voor stevigere vissoorten
			</p>
		</div>
	);
};
const Houdbaarheid = () => {
	return (
		<div className="content-wrapper">
			<h2>Houdbaarheid</h2>
			<p>Vis om rauw te eten: 1 dag</p>
			<p>Verse vis: 3 dagen</p>
			<p>Paëlla / mihoen / lasagne: 3 dagen</p>
			<p>Gerookte vis: 5 dagen</p>
			<p>
				Vacumeren: Verse vis vacumeren beïnvloedt de houdbaarheid in de koelkast
				niet. Het gaat uitdrogen in de vriezer tegen.
			</p>
		</div>
	);
};
const AlgemeneVragen = () => {
	return (
		<div className="content-wrapper">
			<h2>Vissoorten om te bakken</h2>
			<p>
				Goede opties voor hele vis zijn poon, schelvis, wijting en platvissen
				zoals schol, tong en tongschar.
			</p>
			<p>
				Goede opties voor filet zijn scholfilet, tongscharfilet, zeebaarsfilet,
				poonfilet, of een witvis.
			</p>
			<br />
			<h2>Vissoorten voor in de oven</h2>
			<p>Goede opties voor hele vis zijn zeebaars, dorade en forel.</p>
			<p>
				Goede opties voor filet zijn zalmfilet, heekfilet en kabeljauwfilet.
			</p>
			<br />
			<h2>Vissoorten voor in een curry</h2>
			<p>Voor een curry zijn goedkopere, stevige vissoorten de beste optie.</p>
			<p>
				Leng, Panga, Poon, Koolvis, dikke kabeljauw en nijlbaars worden het
				meest gebruikt.
			</p>
			<br />
			<h2>Vissoorten voor in een vissoep</h2>
			<p>
				Voor een vissoep maak je een mix van stevige vissoorten, zalm, en
				optioneel gekookte mosselen en Noorse garnalen.(let op. deze zijn al
				gaar en voeg je pas aan het eind toe).
			</p>
			<p>
				Goede opties voor de stevige vissoorten voor in de vissoep zijn leng,
				poon, roodbaars, panga en dikke kabeljauw.
			</p>
			<br />
			<h2>Vissoorten voor sushi/sashimi</h2>
			<p>Sashimi zijn dun gesneden stukken rauwe vis.</p>
			<p>Goede opties hiervoor zijn tonijn, zalm en zeebaars.</p>
			<br />
			<h2>Vissoorten voor in een pokebowl</h2>
			<p>Voor in de pokebowl wordt vaak rauwe vis gebruikt.</p>
			<p>Goede opties hiervoor zijn tonijn, zalm en zeebaars.</p>
			<br />
			<h2>Stevige vissoorten</h2>
			<p>
				De stevige vissen zijn dikke kabeljauw, zeeduivel, leng, poon, panga,
				nijlbaars en koolvis.
			</p>
		</div>
	);
};

const VeelGesteldeVragen = () => {
	const [tab, setTab] = useState("portie");
	const menuLinks = [
		{
			link: "portie",
			title: "Portie groottes",
		},
		{
			link: "bereiding",
			title: "Bereidswijzen",
		},
		{
			link: "houdbaarheid",
			title: "Houdbaarheid",
		},
		{
			link: "algemeen",
			title: "Algemene vragen",
		},
	];
	const lookup = {
		portie: PortieGroottes,
		bereiding: BereidingsWijzen,
		houdbaarheid: Houdbaarheid,
		algemeen: AlgemeneVragen,
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
		padding: 2rem;
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

export default VeelGesteldeVragen;

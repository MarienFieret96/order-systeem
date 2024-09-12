import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
	return (
		<Wrapper>
			<Link to="/orders">
				<div className="router-button">
					<h2>Bestellingen</h2>
				</div>
			</Link>
			<Link to="/products">
				<div className="router-button">
					<h2>Producten</h2>
				</div>
			</Link>
			<Link to="/inkoop">
				<div className="router-button">
					<h2>Inkooporders</h2>
				</div>
			</Link>
			<Link to="/inpak">
				<div className="router-button">
					<h2>Inpaklijst</h2>
				</div>
			</Link>
			<Link to="/informatie">
				<div className="router-button">
					<h2>Informatie</h2>
				</div>
			</Link>
			<Link to="/instellingen">
				<div className="router-button">
					<h2>Instellingen</h2>
				</div>
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 2rem;
	.router-button {
		aspect-ratio: 3 /2;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--clr-grey);
		border-radius: 20px;
		text-align: center;
		box-shadow: var(--light-shadow);
	}
`;

export default HomePage;

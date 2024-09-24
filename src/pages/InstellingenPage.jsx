import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ForwardIcon } from "../assets/svg";
import { useState } from "react";
import LoginPage from "./LoginPage";

const Reset = () => {
	const navigate = useNavigate();

	const handleDecline = () => {
		navigate("/");
	};
	const handleReset = () => {
		localStorage.removeItem("all_categories");
		localStorage.removeItem("categories");
		localStorage.removeItem("products");
		location.reload();
	};
	return (
		<div className="reset-container">
			<h1>Reset</h1>
			<p>Weet u zeker dat u wilt resetten?</p>
			<div className="row">
				<button className="btn btn-secondary" onClick={handleDecline}>
					Annuleren
				</button>
				<button className="btn btn-primary" onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
};

const InstellingenPage = () => {
	const [tab, setTab] = useState("inloggen");

	const lookup = {
		inloggen: LoginPage,
		reset: Reset,
	};
	const LijstComponent = lookup[tab];

	return (
		<Wrapper>
			<div className="wrapper">
				<div className="sidebar">
					<div
						className={tab === "inloggen" ? "button active" : "button"}
						onClick={() => setTab("inloggen")}
					>
						<h4>Inloggen</h4>
						<ForwardIcon />
					</div>
					<div
						className={tab === "reset" ? "button active" : "button"}
						onClick={() => setTab("reset")}
					>
						<h4>Reset</h4>
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
			display: flex;
			justify-content: center;
			align-items: start;
			width: 100%;
			.reset-container {
				margin-top: 4rem;
				padding: 2rem 4rem;
				border: 1px solid var(--clr-grey);
				border-radius: var(--radius);
				width: 70%;
				display: flex;
				flex-direction: column;
				gap: 1rem;
				text-align: center;
				.row {
					display: flex;
					gap: 1rem;
					button {
						flex: 1;
					}
				}
			}
		}
	}
`;

export default InstellingenPage;

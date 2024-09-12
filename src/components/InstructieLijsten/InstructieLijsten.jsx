import React, { useEffect, useState } from "react";
import styled from "styled-components";
import customFetch from "../../utils/customFetch";
import { CreateInstructieLijst, InstructieLijst } from "../../components";

const InstructieLijsten = () => {
	const [instructieIndex, setInstructieIndex] = useState(0);
	const [createStatus, setCreateStatus] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [instructieLijsten, setInstructieLijsten] = useState([]);

	useEffect(() => {
		setLoading(true);
		const fetchInstructieLijsten = async () => {
			try {
				const response = await customFetch.get("/instructies");
				const instructies = response.data.instructies;
				localStorage.setItem("instructies", JSON.stringify(instructies));
				if (instructies.length === 0) {
					setCreateStatus(true);
				}
				setInstructieLijsten(instructies);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		const getInstructieLijsten = () => {
			let instructies = localStorage.getItem("instructies");
			if (instructies) {
				return JSON.parse(localStorage.getItem("instructies"));
			} else {
				return [];
			}
		};
		const instructies = getInstructieLijsten();
		if (instructies.length === 0) {
			fetchInstructieLijsten();
		} else {
			setInstructieLijsten(instructies);
			setLoading(false);
		}
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Er is iets mis gegaan</div>;
	}

	return (
		<Wrapper>
			{createStatus ? (
				<CreateInstructieLijst
					setCreateStatus={setCreateStatus}
					instructieLijsten={instructieLijsten}
					setInstructieLijsten={setInstructieLijsten}
				/>
			) : (
				<>
					<div className="nav-menu">
						{instructieLijsten.map((item, index) => {
							return (
								<div
									className={
										instructieIndex === index ? "button active" : "button"
									}
									key={index}
									onClick={() => setInstructieIndex(index)}
								>
									<h4>{item.titel}</h4>
								</div>
							);
						})}
					</div>
					<InstructieLijst
						instructieIndex={instructieIndex}
						setInstructieIndex={setInstructieIndex}
						setCreateStatus={setCreateStatus}
						instructieLijsten={instructieLijsten}
						setInstructieLijsten={setInstructieLijsten}
					/>
				</>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	position: relative;
	width: calc(100% - 200px);
	.nav-menu {
		max-width: 100%;
		display: flex;
		flex-direction: row;
		height: 100px;
		overflow-x: scroll;
		overflow-y: clip;
		.button {
			flex: 1;
			min-width: 175px;
			display: flex;
			justify-content: center;
			height: 100px;
			align-items: center;
			text-align: center;
			border-right: 1px solid var(--clr-grey);
		}
		.active {
			background-color: var(--clr-light-grey);
		}
	}
	.nav-menu::-webkit-scrollbar {
		width: 0px;
		height: 10px;
	}
	.nav-menu::-webkit-scrollbar-track {
		background: transparent;
	}
	.nav-menu::-webkit-scrollbar-thumb {
		background: var(--clr-grey);
	}
	.content-wrapper {
		height: 100%;
		width: 100%;
		padding: 2rem;
		padding-bottom: 10rem;
		overflow: scroll;
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
		.instructie-toevoegen {
			position: absolute;
			bottom: 2rem;
			right: 2rem;
			padding: 1rem;
		}
		.title-row {
			display: flex;
			justify-content: space-between;
			.svg-container {
				svg {
					vertical-align: top;
					height: 32px;
				}
			}
		}
		.row {
			display: flex;
			gap: 1rem;
		}
		form {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			input {
				padding: 0.5rem;
				width: 100%;
			}
			h4 {
				margin-top: 0;
				margin-bottom: -0.5rem;
			}
			.row {
				button {
					width: 100%;
				}
			}
			.add-option {
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
			.form-control {
				display: flex;
				height: 34px;
				.delete-option {
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
		}
	}
	.content-wrapper::-webkit-scrollbar {
		width: 0px;
	}
`;

export default InstructieLijsten;

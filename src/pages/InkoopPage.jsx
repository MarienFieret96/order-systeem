import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	InkoopSidebar,
	AddInkoopProduct,
	AdviesInkoopProduct,
	UpdateInkoopProduct,
	InkoopProduct,
	CreateNewLeverancier,
} from "../components";
import { ForwardIcon } from "../assets/svg/ForwardIcon";
import customFetch from "../utils/customFetch";

const dummyData = [
	{
		_id: 123,
		leverancier: "Adri en Zoon",
		producten: [
			{ naam: "Kabeljauw", voorraad: 0, threshold: 0 },
			{ naam: "Zalmfilet E-trim 5/6", voorraad: 0, threshold: 0 },
			{ naam: "Zalmfilet D-trim 5/6", voorraad: 0, threshold: 3 },
			{ naam: "Zeekraal 1kg", voorraad: 0, threshold: 0 },
			{ naam: "Lamsoor 1kg", voorraad: 0, threshold: 0 },
			{ naam: "Mosselen Imperial 10x1", voorraad: 0, threshold: 0 },
		],
	},
	{
		_id: 234,
		leverancier: "Oom Marien",
		producten: [
			{ naam: "Kabeljauw", voorraad: 0, threshold: 0 },
			{ naam: "Zalmfilet E-trim 5/6", voorraad: 0, threshold: 0 },
			{ naam: "Zalmfilet D-trim 5/6", voorraad: 0, threshold: 0 },
			{ naam: "Zeekraal 1kg", voorraad: 0, threshold: 0 },
			{ naam: "Lamsoor 1kg", voorraad: 0, threshold: 0 },
			{ naam: "Mosselen Imperial 10x1", voorraad: 0, threshold: 0 },
		],
	},
	{
		_id: 345,
		leverancier: "Van Barneveld",
		producten: [
			{ naam: "Kabeljauw", voorraad: 0, threshold: 0 },
			{ naam: "Zalmfilet E-trim 5/6", voorraad: 0, threshold: 0 },
			{ naam: "Zalmfilet D-trim 5/6", voorraad: 0, threshold: 0 },
			{ naam: "Zeekraal 1kg", voorraad: 0, threshold: 0 },
			{ naam: "Lamsoor 1kg", voorraad: 0, threshold: 0 },
			{ naam: "Mosselen Imperial 10x1", voorraad: 0, threshold: 0 },
		],
	},
];

const InkoopPage = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [inkoopProducten, setInkoopProducten] = useState([]);
	const [inkoopIndex, setInkoopIndex] = useState(0);
	const [inkoopProductStatus, setInkoopProductStatus] = useState("read");

	useEffect(() => {
		setLoading(true);
		const fetchInkoopProducten = async () => {
			try {
				const response = await customFetch.get("inkoop");
				const inkoopProducten = response.data.inkoopProducten;
				localStorage.setItem(
					"inkoopProducten",
					JSON.stringify(inkoopProducten),
				);
				setInkoopProducten(inkoopProducten);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		const getInkoopProducten = () => {
			let inkoopProducten = localStorage.getItem("inkoopProducten");
			if (inkoopProducten) {
				return JSON.parse(localStorage.getItem("inkoopProducten"));
			} else {
				return [];
			}
		};
		const inkoopProducten = getInkoopProducten();
		if (inkoopProducten.length === 0) {
			fetchInkoopProducten();
		} else {
			setInkoopProducten(inkoopProducten);
			setLoading(false);
		}
	}, []);

	if (loading) {
		return <div>Loading....</div>;
	}
	if (error) {
		return <div>Er is iets mis gegaan...</div>;
	}

	const renderContent = () => {
		if (inkoopProductStatus === "read") {
			return (
				<InkoopProduct
					setInkoopProducten={setInkoopProducten}
					inkoopProducten={inkoopProducten}
					inkoopIndex={inkoopIndex}
					setInkoopIndex={setInkoopIndex}
					inkoopProductStatus={inkoopProductStatus}
					setInkoopProductStatus={setInkoopProductStatus}
				/>
			);
		}
		if (inkoopProductStatus === "add") {
			return (
				<AddInkoopProduct
					inkoopProducten={inkoopProducten}
					setInkoopProducten={setInkoopProducten}
				/>
			);
		}
		if (inkoopProductStatus === "create") {
			return (
				<CreateNewLeverancier
					setInkoopProductStatus={setInkoopProductStatus}
					inkoopProducten={inkoopProducten}
					setInkoopProducten={setInkoopProducten}
				/>
			);
		}
		if (inkoopProductStatus === "update") {
			return <UpdateInkoopProduct />;
		}
		return (
			<AdviesInkoopProduct
				inkoopProducten={inkoopProducten}
				inkoopIndex={inkoopIndex}
				setInkoopProductStatus={setInkoopProductStatus}
			/>
		);
	};
	return (
		<Wrapper>
			<div className="wrapper">
				<InkoopSidebar
					inkoopProducten={inkoopProducten}
					inkoopIndex={inkoopIndex}
					setInkoopIndex={setInkoopIndex}
					inkoopProductStatus={inkoopProductStatus}
					setInkoopProductStatus={setInkoopProductStatus}
				/>
				{renderContent()}
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
		.content-wrapper {
			padding: 2rem;
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: 1rem;
			.row {
				display: flex;
				justify-content: space-between;
				gap: 1rem;
				h2 {
					margin-bottom: 1rem;
				}
				.input-container {
					width: 100%;
					h4 {
						margin-bottom: 0.5rem;
					}
				}
				.svg-container {
					svg {
						vertical-align: top;
						height: 32px;
					}
				}
				button {
					width: 100%;
				}
			}
			form {
				display: flex;
				flex-direction: column;
				gap: 1rem;
			}
			input,
			select {
				padding: 0.5rem;
				width: 100%;
			}
		}
		.inkoop {
			.center {
				display: flex;
				justify-content: start;
				align-items: center;
			}
			.grid {
				display: grid;
				grid-template-columns: 3fr 2fr 1fr 0.5fr;
			}

			.svg-container {
				display: flex;
				align-items: end;
				justify-content: end;

				svg {
					vertical-align: top;
					height: 32px;
				}
			}
		}
		.counter {
			input {
				width: 50px;
			}
		}
	}
`;

export default InkoopPage;

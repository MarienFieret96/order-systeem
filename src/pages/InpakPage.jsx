import React, { useState, useEffect } from "react";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import {
	CreateInpakContent,
	InpakContent,
	InpakSidebar,
	UpdateInpakContent,
} from "../components";

const InpakPage = () => {
	const [inpakIndex, setInpakIndex] = useState(0);
	const [inpakProductStatus, setInpakProductStatus] = useState("read");
	const [inpakProductDataIndex, setInpakProductDataIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [inpakProducten, setInpakProducten] = useState([]);

	useEffect(() => {
		setLoading(true);
		const fetchInpakProducten = async () => {
			try {
				const response = await customFetch.get("inpakken");
				const inpakProducten = response.data.inpakProducts;
				localStorage.setItem("inpakProducten", JSON.stringify(inpakProducten));
				setInpakProducten(inpakProducten);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		const getInpakProducten = () => {
			let inpakProducten = localStorage.getItem("inpakProducten");
			if (inpakProducten) {
				return JSON.parse(localStorage.getItem("inpakProducten"));
			} else {
				return [];
			}
		};

		const inpakProducten = getInpakProducten();
		if (inpakProducten.length === 0) {
			fetchInpakProducten();
		} else {
			setInpakProducten(inpakProducten);
			console.log(inpakProducten);
			setLoading(false);
		}
	}, []);
	if (loading) {
		return <div>Loading....</div>;
	}
	if (error) {
		return <div>ER is iets mis gegaan...</div>;
	}

	const renderContent = () => {
		if (inpakProductStatus === "read") {
			return (
				<InpakContent
					inpakProduct={inpakProducten[inpakIndex]}
					setInpakProducten={setInpakProducten}
					setInpakProductDataIndex={setInpakProductDataIndex}
					inpakIndex={inpakIndex}
					setInpakIndex={setInpakIndex}
					setInpakProductStatus={setInpakProductStatus}
				/>
			);
		}
		if (inpakProductStatus === "add") {
			return (
				<UpdateInpakContent
					inpakProduct={inpakProducten[inpakIndex]}
					setInpakProductStatus={setInpakProductStatus}
					inpakProductStatus={inpakProductStatus}
					inpakProducten={inpakProducten}
					setInpakProducten={setInpakProducten}
					inpakIndex={inpakIndex}
				/>
			);
		}
		if (inpakProductStatus === "update") {
			return (
				<UpdateInpakContent
					inpakProduct={inpakProducten[inpakIndex]}
					setInpakProductStatus={setInpakProductStatus}
					inpakProductStatus={inpakProductStatus}
					inpakProducten={inpakProducten}
					setInpakProducten={setInpakProducten}
					inpakIndex={inpakIndex}
					inpakProductDataIndex={inpakProductDataIndex}
				/>
			);
		}
		return (
			<CreateInpakContent
				setInpakProductStatus={setInpakProductStatus}
				inpakProducten={inpakProducten}
				setInpakProducten={setInpakProducten}
			/>
		);
	};

	return (
		<Wrapper>
			<div className="wrapper">
				<InpakSidebar
					inpakIndex={inpakIndex}
					setInpakIndex={setInpakIndex}
					setInpakProductStatus={setInpakProductStatus}
					inpakProductStatus={inpakProductStatus}
					inpakProducten={inpakProducten}
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
	max-width: 100%;
	width: 100%;
	.wrapper {
		display: flex;
		height: 100%;

		width: 100%;
		max-width: 100%;
		position: relative;
		.sidebar {
			min-width: 200px;
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
			.grid {
				display: grid;
				grid-template-columns: 2fr 2fr 1fr 1fr 2fr 1fr;
				.center {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				svg {
					height: 24px;
					vertical-align: top;
				}
			}
			.header {
				margin-top: 2rem;
				text-transform: capitalize;
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
	}
`;

export default InpakPage;

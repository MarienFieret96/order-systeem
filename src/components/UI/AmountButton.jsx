import React from "react";
import styled from "styled-components";
import { PlusIcon, MinusIcon } from "../../assets/svg";

const AmountButton = ({ increase, decrease, amount }) => {
	return (
		<Wrapper>
			<button type="button" className="amount-btn" onClick={decrease}>
				<MinusIcon />
			</button>
			<h2 className="amount">{amount}</h2>
			<button type="button" className="amount-btn" onClick={increase}>
				<PlusIcon />
			</button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: grid;
	width: 90px;
	justify-items: center;
	grid-template-columns: repeat(3, 1fr);
	align-items: center;
	.amount {
		margin-bottom: 0;
	}
	.amount-btn {
		background: transparent;
		border-color: transparent;
		cursor: pointer;
		padding: 1rem 0;
		width: 2rem;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export default AmountButton;

import styled from "styled-components";

const Checkbox = ({ isChecked, label, checkHandler, index }) => {
	return (
		<Wrapper>
			<input
				type="checkbox"
				id={`checkbox-${label}-${index}`}
				checked={isChecked}
				onChange={checkHandler}
			/>
			<label htmlFor={`checkbox-${label}-${index}`}>{label}</label>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: block;
	height: 2.25rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	border: 1px solid var(--clr-grey);
	border-radius: var(--radius);
	padding: 0.375rem 0.75rem;
	background-color: var(--clr-light-grey);
	white-space: nowrap;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

export default Checkbox;

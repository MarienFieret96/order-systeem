import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";

const LoginPage = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState({
		email: "chris@gmail.com",
		password: "secret",
	});
	const handleSubmit = async () => {
		try {
			const { data } = await customFetch.post("/auth/login", login);
			console.log(data);
			navigate("/");
		} catch (error) {
			navigate("/orders");
		}
	};
	return (
		<Wrapper>
			<div className="login-container">
				<h1>Login</h1>
				<input
					type="text"
					placeholder="email"
					autoFocus
					onChange={(e) => setLogin({ ...login, email: e.target.value })}
					value={login.email}
				/>
				<input
					type="text"
					placeholder="password"
					onChange={(e) => setLogin({ ...login, password: e.target.value })}
					value={login.password}
				/>
				<button onClick={() => handleSubmit()} className="btn btn-primary">
					Aanmelden
				</button>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	.login-container {
		margin: 4rem 10rem;
		padding: 2rem;
		border: 1px solid var(--clr-grey);
		border-radius: var(--radius);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-align: center;
		input {
			padding: 0.5rem;
			height: 2.25rem;
			border: 1px solid var(--clr-grey);
		}
	}
`;

export default LoginPage;

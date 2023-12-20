import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});
	const handleSubmit = async () => {
		try {
			const { data } = await axios.post(
				"https://ordersysteem.onrender.com/api/v1/auth/login",
				login,
				{
					withCredentials: true,
					headers: {
						"Content-type": "application/json",
					},
				},
			);
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

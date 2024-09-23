import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";

const LoginPage = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const handleSubmit = async () => {
		setLoading(true);
		try {
			const { data } = await customFetch.post("/auth/login", login);
			navigate("/");
		} catch (error) {
			toast.error("inloggen niet gelukt");
		} finally {
			setLoading(false);
		}
	};
	return (
		<Wrapper>
			<div className="login-container">
				<h1>Login</h1>
				<input
					type="text"
					placeholder="Email"
					autoFocus
					onChange={(e) => setLogin({ ...login, email: e.target.value })}
					value={login.email}
				/>
				<input
					type="text"
					placeholder="Wachtwoord"
					onChange={(e) => setLogin({ ...login, password: e.target.value })}
					value={login.password}
				/>
				<button
					onClick={() => handleSubmit()}
					className="btn btn-primary"
					disabled={loading}
				>
					{loading ? "Laden..." : "Aanmelden"}
				</button>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	.login-container {
		margin-top: 4rem;
		padding: 2rem 4rem;
		border: 1px solid var(--clr-grey);
		border-radius: var(--radius);
		width: 70%;
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

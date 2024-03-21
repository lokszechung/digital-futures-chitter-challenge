import { useEffect, useState } from "react";
import axios from "axios";

import { isAuthenticated, setToken } from "../../../utils/auth.js";

// import { useNavigate } from "react-router-dom";

import "./LogInForm.css";

const LogInForm = ({ handleCloseModal, setAuthenticated }) => {
	// const navigate = useNavigate();

	const [formFields, setFormFields] = useState({
		usernameOrEmail: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		setFormFields({ ...formFields, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:4000/api/user/login",
				formFields
			);
			setToken(response.data.token);
			setAuthenticated(isAuthenticated());
			handleCloseModal();
		} catch (error) {
			console.error(error);
			setError(error.response.data.message);
		}
	};

	return (
		<form className="login-form">
			<div className="form-floating mb-3 w-100">
				<input
					type="text"
					className="form-control"
					name="usernameOrEmail"
					id="floatingInput"
					placeholder="Email or username"
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingInput">Email or username</label>
			</div>
			<div className="form-floating w-100">
				<input
					type="password"
					className="form-control"
					name="password"
					id="floatingPassword"
					placeholder="Password"
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingPassword">Password</label>
			</div>
			<button
				type="submit"
				className="login btn btn-primary w-50 mt-3"
				onClick={handleSubmit}
			>
				Log In
			</button>
		</form>
	);
};

export default LogInForm;

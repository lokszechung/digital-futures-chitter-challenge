import axios from "axios";

import { useEffect, useState } from "react";
import { setToken, isAuthenticated } from "../../../utils/auth";

import "./SignUpForm.css";

const SignUpForm = ({ handleCloseModal, setAuthenticated }) => {
	const [formFields, setFormFields] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	});
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		setFormFields({ ...formFields, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:4000/api/user/register",
				formFields
			);
			setToken(response.data.token);
			handleCloseModal();
			setTimeout(() => {
				setAuthenticated(isAuthenticated());
			}, 300);
		} catch (error) {
			console.error(error);
			setError(error.response.data.message);
		}
	};

	return (
		<form className="signup-form">
			<div className="form-floating mb-3 w-100">
				<input
					type="text"
					className="form-control"
					name="firstname"
					id="floatingName"
					placeholder="First name"
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingName">First name</label>
			</div>
			<div className="form-floating mb-3 w-100">
				<input
					type="text"
					className="form-control"
					name="lastname"
					id="floatingSurname"
					placeholder="Surname"
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingName">Surname</label>
			</div>
			<div className="form-floating mb-3 w-100">
				<input
					type="text"
					className="form-control"
					name="username"
					id="floatingUsername"
					placeholder="Username"
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingUsername">Username</label>
			</div>
			<div className="form-floating mb-3 w-100">
				<input
					type="email"
					className="form-control"
					name="email"
					id="floatingEmail"
					placeholder="Email"
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingEmail">Email</label>
			</div>
			<div className="form-floating mb-3 w-100">
				<input
					type="password"
					className="form-control"
					name="password"
					id="floatingPasswordSignUp"
					placeholder="Password"
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingPasswordSignUp">Password</label>
			</div>
			<div className="form-floating w-100">
				<input
					type="password"
					className="form-control"
					name="passwordConfirmation"
					id="floatingPasswordConfirmation"
					placeholder="Confirm Password"
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingPasswordConfirmation">Confirm Password</label>
			</div>
			<button type="submit" className="signup mt-3" onClick={handleSubmit}>
				Sign Up
			</button>
		</form>
	);
};

export default SignUpForm;

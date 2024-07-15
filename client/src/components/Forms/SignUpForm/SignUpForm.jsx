import { useState } from "react";
import { setToken, isAuthenticated } from "../../../utils/auth.js";
import { signUp } from "../../../utils/services.js";

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
		setError("");
		setFormFields({ ...formFields, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await signUp(formFields);
			setToken(response.token);
			handleCloseModal();
			setTimeout(() => {
				setAuthenticated(isAuthenticated());
			}, 300);
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<form className="signup-form" onSubmit={handleSubmit}>
			<div className="form-floating mb-3 w-100">
				<input
					type="text"
					className="form-control"
					name="firstname"
					id="floatingName"
					placeholder="First name"
					required
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
					required
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
					required
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
					required
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
					data-testid="sign-up-password"
					placeholder="Password"
					required
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
					required
					onChange={handleInputChange}
				/>
				<label htmlFor="floatingPasswordConfirmation">Confirm Password</label>
			</div>
			{error && <p className="text-danger mt-3 mb-0">{error}</p>}
			<button
				type="submit"
				className="signup mt-3"
				data-testid="sign-up-submit"
			>
				Sign Up
			</button>
		</form>
	);
};

export default SignUpForm;

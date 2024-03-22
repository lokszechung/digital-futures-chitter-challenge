import axios from "axios";

import { useRef, useState } from "react";
import { setToken, isAuthenticated } from "../../../utils/auth";

import "./SignUpForm.css";

const SignUpForm = ({ handleCloseModal, setAuthenticated }) => {
	// const formRef = useRef(null);

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

	// const findEmptyFormFields = () => {
	// 	let emptyFields = "";
	// 	for (const field in formFields) {
	// 		if (formFields[field] === "") {
	// 			emptyFields
	// 				? (emptyFields += `, ${field}`)
	// 				: (emptyFields += `${field}`);
	// 		}
	// 	}
	// 	if (emptyFields) {
	// 		throw new Error(`${emptyFields} cannot be empty`);
	// 	} else {
	// 		return;
	// 	}
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// findEmptyFormFields();

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
			// setError(error.message);
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
			<button type="submit" className="signup mt-3">
				Sign Up
			</button>
		</form>
	);
};

export default SignUpForm;

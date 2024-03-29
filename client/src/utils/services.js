import axios from "axios";

import { getToken } from "./auth";

export const getAllPeeps = async () => {
	try {
		const { data } = await axios.get("http://localhost:4000/api/peep");
		return data;
	} catch (error) {
		throw error;
	}
};

export const postPeep = async (content) => {
	try {
		await axios.post(
			"http://localhost:4000/api/peep",
			{
				content: content,
			},
			{
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			}
		);
	} catch (error) {
		throw error;
	}
};

export const logIn = async (formFields) => {
	try {
		const { data } = await axios.post(
			"http://localhost:4000/api/user/login",
			formFields
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const signUp = async (formFields) => {
	try {
		const { data } = await axios.post(
			"http://localhost:4000/api/user/register",
			formFields
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const getUser = async (id) => {
	try {
		const { data } = await axios.get(`http://localhost:4000/api/user/${id}`);
		return data;
	} catch (error) {
		throw error;
	}
};

export const deletePeep = async (id) => {
	try {
		await axios.delete(`http://localhost:4000/api/peep/${id}`, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
	} catch (error) {
		throw error;
	}
};

export const updatePeep = async (id, content) => {
	try {
		const { data } = await axios.put(
			`http://localhost:4000/api/peep/${id}`,
			{
				content: content,
			},
			{
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			}
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const getSinglePeep = async (id) => {
	try {
		const { data } = await axios.get(`http://localhost:4000/api/peep/${id}`);
		return data;
	} catch (error) {
		throw error;
	}
};

export const replyPeep = async (id, content) => {
	try {
		await axios.post(
			`http://localhost:4000/api/peep/reply/${id}`,
			{
				content: content,
			},
			{
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			}
		);
	} catch (error) {
		throw error;
	}
};

export const getNotifications = async () => {
	try {
		const { data } = await axios.get("http://localhost:4000/api/notification", {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export const updateNotification = async (id) => {
	try {
		await axios.put(
			`http://localhost:4000/api/notification/${id}`,
			{ unread: false },
			{
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			}
		);
	} catch (error) {
		throw error;
	}
};

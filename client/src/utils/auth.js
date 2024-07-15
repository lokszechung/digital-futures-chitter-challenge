import { Buffer } from "buffer";

const tokenName = "chitter-token";

export const setToken = (token) => {
	localStorage.setItem(tokenName, token);
};

export const getToken = () => {
	return localStorage.getItem(tokenName);
};

export const getPayload = () => {
	const token = getToken();
	if (!token) return false;
	const splitToken = token.split(".");
	if (splitToken.length !== 3) return false;
	// Decoding the base64 encoded string, and returning the payload object that was the second part of the JWT
	return JSON.parse(Buffer.from(splitToken[1], "base64"));
};

export const isAuthenticated = () => {
	const payload = getPayload();
	if (!payload) return false;
	// Check the expiry from the token is in the future
	const { exp } = payload;
	const now = Math.round(Date.now() / 1000);
	return exp > now;
};

export const handleLogOut = () => {
	localStorage.removeItem(tokenName);
};

// export const isOwner = (token1) => {
// 	const payload = getPayload();
// 	if (!payload) return false;
// 	return token1 === payload.sub;
// };

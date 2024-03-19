const User = require("../models/User");
require("dotenv").config();
const axios = require("axios")
// const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require("./config");

const LogoutController = (req, res) => {
	req.logout();
	res.redirect("/");
};

const getUserController = (req, res) => {
	if (!req.user) {
		return res.status(401).json({ error: "unauthorized", status: false });
	}
	res
		.status(200)
		.json({ status: true, msg: "user successfully fetched", user: req.user });
};

const githubLoginController = async (req, res) => {
	console.log("query code is", req.query.code);
	const authorizationCode = req.query.code;
	const accessToken = await exchangeCodeForToken(authorizationCode);
	console.log('****', accessToken);
	// res.redirect(`${process.env.FRONTEND_URL}?code=${authorizationCode}`);
	res.redirect(`${process.env.FRONTEND_URL}`);
};

async function exchangeCodeForToken(authorizationCode) {
	const tokenEndpoint = "https://github.com/login/oauth/access_token";
	const clientId = process.env.GITHUB_CLIENT_ID;
	const clientSecret = process.env.GITHUB_CLIENT_SECRET;
	const redirectUri = "http://localhost:5002/api/auth/github/callback";

	const params = new URLSearchParams();
	params.append("client_id", clientId);
	params.append("client_secret", clientSecret);
	params.append("code", authorizationCode);
	params.append("redirect_uri", redirectUri);

	try {
		const response = await axios.post(tokenEndpoint, params.toString(), {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		if (response.status === 200) {
			const accessToken = response.data.access_token;
			console.log("%%%%", authorizationCode);
			console.log('....',response.data);
			return accessToken;
		} else {
			throw new Error(
				`Failed to exchange code for token: ${response.status} ${response.statusText}`
			);
		}
	} catch (error) {
		console.error("Error exchanging code for token:", error);
		throw error;
	}
}

module.exports = {
	LogoutController,
	getUserController,
	githubLoginController,
};

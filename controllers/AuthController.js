const User = require("../models/User");
require("dotenv").config();
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
	console.log('accessToken is',accessToken);
	// res.redirect(`${process.env.FRONTEND_URL}?code=${authorizationCode}`);
	res.redirect("http://localhost:3001");
};

async function exchangeCodeForToken(authorizationCode) {
	const tokenEndpoint = "https://github.com/login/oauth/access_token";
	const clientId = process.env.GITHUB_CLIENT_ID;
	const clientSecret = process.env.GITHUB_CLIENT_SECRET;
	const redirectUri = "http://localhost:3001";

	const params = new URLSearchParams();
	params.append("client_id", clientId);
	params.append("client_secret", clientSecret);
	params.append("code", authorizationCode);
	params.append("redirect_uri", redirectUri);

	const response = await fetch(tokenEndpoint, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: params,
	});

	const data = await response.text();
	const accessToken = new URLSearchParams(data).get("access_token");
	return accessToken;
}

module.exports = {
	LogoutController,
	getUserController,
	githubLoginController,
};

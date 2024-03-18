// const fetch = require("node-fetch");
// const {
// 	GITHUB_CLIENT_ID,
// 	GITHUB_CLIENT_SECRET,
// } = require("./config");
// const { authorizationCode } = require("./controllers/AuthController")

// async function exchangeCodeForToken(authorizationCode) {
// 	const tokenEndpoint = "https://github.com/login/oauth/access_token";
// 	const clientId = GITHUB_CLIENT_ID;
// 	const clientSecret = GITHUB_CLIENT_SECRET;
// 	const redirectUri = "http://localhost:3002";

// 	const params = new URLSearchParams();
// 	params.append("client_id", clientId);
// 	params.append("client_secret", clientSecret);
// 	params.append("code", authorizationCode);
// 	params.append("redirect_uri", redirectUri);

// 	const response = await fetch(tokenEndpoint, {
// 		method: "POST",
// 		headers: {
// 			Accept: "application/json",
// 			"Content-Type": "application/x-www-form-urlencoded",
// 		},
// 		body: params,
// 	});

// 	const data = await response.text();
// 	const accessToken = new URLSearchParams(data).get("access_token");
//     console.log('acceeToken is',accessToken);

// 	return accessToken;
// }

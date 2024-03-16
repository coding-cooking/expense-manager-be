const User = require("../models/User");

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

const githubLoginController = (req, res) => {
	res.redirect("http://localhost:3002");
};

module.exports = {
	LogoutController,
	getUserController,
	githubLoginController,
};

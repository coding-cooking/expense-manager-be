const passport = require("passport");
const GithubStrategy = require("passport-github2");

const User = require("../models/User");
require("dotenv").config();
// const {
// 	GITHUB_CLIENT_ID,
// 	GITHUB_CLIENT_SECRET,
// 	GITHUB_CALLBACK_URL,
// } = require("../config");

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		let user = await User.findById(id, "name email _id");
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.GITHUB_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const user = await User.findOne({ githubId: profile.id });
				// console.log(profile.displayName, profile.email, profile.id);
				console.log("21212121", accessToken, refreshToken);
				if (user) {
					console.log("-----user", user);
					return done(null, user);
				} else {
					console.log("hereeeeeee");
					const name = profile.displayName || profile.username || "Anonymous";
					const newUser = new User({
						email: profile.email,
						name: name,
						githubId: profile.id,
					});

					const savedUser = await newUser.save();

					done(null, savedUser);
				}
			} catch (error) {
				done(error);
			}
		}
	)
);

module.exports = passport;

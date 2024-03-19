const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongo"); // Define MongoStore here
const AuthRoute = require("./routes/AuthRoute");
const passport = require("./services/passport");
// const { URI, SECRET } = require("./config");
const PORT = process.env.PORT || 5005;
require("dotenv").config();
const cors = require("cors");

const MongoStore = MongoDBStore.create({
	mongoUrl: process.env.URI, // Use the mongoUrl option
	autoRemove: "interval",
	autoRemoveInterval: 10,
});

const app = express();

app.use(express.json());
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", AuthRoute);
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.options("*", cors());

mongoose
	.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("connected to mongo database"))
	.catch((error) => console.error(error));

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

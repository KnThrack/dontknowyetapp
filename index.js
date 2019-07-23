// Import express
let express = require("express");
let jwt = require("express-jwt");
let jwksRsa = require("jwks-rsa");
var jwttoken = require("jsonwebtoken");
const firebaseAdmin = require("firebase-admin");
// Import Body parser
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");
// Import cors
let cors = require("cors");
const util = require("util");
// Initialize the app
let app = express();

// Set up Auth0 configuration
const authConfig = {
	domain: "shrill-brook-0201.eu.auth0.com",
	audience: "https://notsureyetapp.herokuapp.com/api"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-dontknowyet.eu.auth0.com
const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
	}),

	audience: authConfig.audience,
	issuer: `https://${authConfig.domain}/`,
	algorithm: ["RS256"]
});

app.use(checkJwt);

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.use(cors());

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
var db = mongoose.connection;

// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
//app.get('/', checkJwt, (req, res) => res.send('Hello World with Express'));

// test sth
app.use((req, res, next) => {
	// read the auth header and get the user out
	if (req.headers.authorization) {
		var authorization = req.headers.authorization.split(" ")[1],
			decoded;

		try {
			// decode it
			decoded = jwttoken.decode(authorization, { complete: true });
			// set it
			req.app.set("usr-mail", decoded.payload["https://dontknowyet.com/email"]);
			req.app.set("usr", decoded.payload.sub);
		} catch (err) {
			console.log("error jwttoken: ");
			return next();
		}
	}
	next();
});

// google firebase

// Initialize Firebase Admin with service account
firebaseAdmin.initializeApp({
	credential: admin.credential.cert({
		type: "service_account",
		project_id: "dontknowyet",
		private_key: process.env.FIRE_KEY,
		client_email: process.env.FIRE_EMAIL
	}),
	databaseURL: "https://dontknowyet.firebaseio.com"
});

app.get("/auth/firebase", jwtCheck, (req, res) => {
	// Create UID from authenticated Auth0 user
	const uid = req.user.sub;
	// Mint token using Firebase Admin SDK
	firebaseAdmin
		.auth()
		.createCustomToken(uid)
		.then(customToken =>
			// Response must be an object or Firebase errors
			res.json({ firebaseToken: customToken })
		)
		.catch(err =>
			res.status(500).send({
				message: "Something went wrong acquiring a Firebase token.",
				error: err
			})
		);
});

// Use Api routes in the App
app.use("/api", apiRoutes);
// Launch app to listen to specified port
app.listen(port, function() {
	console.log("Running RestHub on port " + port);
});

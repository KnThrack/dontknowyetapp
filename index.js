// Import express
let express = require('express');
let jwt = require("express-jwt");
let jwksRsa = require("jwks-rsa");
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Import cors
let cors = require("cors");

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

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
    res.send({
        msg: "Your Access Token was successfully validated!"
    });
});

// Import routes
let apiRoutes = require("./api-routes")
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
var db = mongoose.connection;

// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', checkJwt, (req, res) => res.send('Hello World with Express'));

// test sth 
app.use(function (req, res, next) {
    console.log('Hello Time:', Date.now());
    if (req.authorization) console.log(req.Authorization);
    if (req.header.Authorization) console.log(req.header.authorization);
    next();
});

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
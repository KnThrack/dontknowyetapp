// Import express
let express = require('express');
let jwt = require("express-jwt");
let jwksRsa = require("jwks-rsa");
var jwttoken = require('jsonwebtoken');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Import cors
let cors = require("cors");
const util = require('util')
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
app.use((req, res, next) => {
    // read the auth header and get the user out
    if (req.headers.authorization) {

        var authorization = req.headers.authorization.split(' ')[1],
            decoded, decoded2;

        try {
            // decode it 
            decoded = jwttoken.decode(authorization, { complete: true });
            // set it
            req.app.set('usr-mail', decoded.payload['https://dontknowyet.com/email']);
            req.app.set('usr', decoded.payload.sub);
        } catch (err) {
            console.log("error jwttoken: ");
            return next();
        }
    }

    next();
});

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
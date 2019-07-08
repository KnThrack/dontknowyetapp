// usersController.js
// Import users model
Users = require('./userModel');

// query parser instatiation
const { MongooseQueryParser } = require('mongoose-query-parser');
const parser = new MongooseQueryParser();

//const parser = new MongooseQueryParser();
// import { MongooseQueryParser } from 'mongoose-query-parser';
// const parser = new MongooseQueryParser();

// Handle index actions
exports.index = function (req, res) {

    if (Object.keys(req.query).length === 0) {
        // no query strings so get it all
        Users.get(function (err, users) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        });

    } else {
        // we got some query so lets query !

        const parsed = parser.parse(req.query);

        Users.find(parsed.filter, function (err, users) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            //parse(req.query);
            res.json({
                status: "success",
                message: "url parameters parsing",
                query: parsed,
                data: users
            });
        });

    }

};
// Handle create users actions
exports.new = function (req, res) {
    var users = new Users();
    users.name = req.body.name ? req.body.name : users.name;
    users.email = req.body.email ? req.body.email : users.email;;
    // save the users and check for errors
    users.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New users created!',
            data: users
        });
    });
};
// Handle view users info
exports.view = function (req, res) {
    Users.findById(req.params.users_id, function (err, users) {
        if (err)
            res.send(err);
        res.json({
            message: 'Users details loading..',
            data: users
        });
    });
};
// Handle update users info
exports.update = function (req, res) {
    console.log(req.params.users_id);
    Users.findById(req.params.users_id, function (err, users) {
        if (err)
            res.send(err);
        console.log(JSON.stringify(req.body));
        users.name = req.body.name ? req.body.name : users.name;
        users.email = req.body.email ? req.body.email : users.email;
        // save the users and check for errors
        users.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Users Info updated',
                data: users
            });
        });
    });
};
// Handle delete users
exports.delete = function (req, res) {
    Users.remove({
        _id: req.params.users_id
    }, function (err, users) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Users deleted'
        });
    });
};
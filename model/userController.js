// usersController.js
// Import users model
Users = require('./userModel');
const util = require('util')
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
            var usr = req.app.get("usr");
            var real_users = JSON.parse(JSON.stringify(users));
            if (usr === real_users[0].auth0ID) {
                res.json({
                    status: "success",
                    message: "Users retrieved successfully",
                    data: users
                });
            } else {
                res.json({
                    status: "error",
                    message: `logged in user: ${usr} not equals to user: ${users}`,
                });
            }
        });

    } else {
        // we got some query so lets query !
        const parsed = parser.parse(req.query);
        var usrmail = req.app.get("usr-mail");
        if (parsed.filter.email !== usrmail) return;
        Users.find(parsed.filter, function (err, users) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            //parse(req.query);
            var usr = req.app.get("usr");
            console.log(`logged in user: ${JSON.stringify(users)} ` + typeof users );
            var real_users = JSON.parse(JSON.stringify(users));

            if (JSON.stringify(users) === null || JSON.stringify(users) === undefined || JSON.stringify(users) === [] || JSON.stringify(users) === "[]" ) {
                res.json({
                    status: "error",
                    message: `No User found`,
                });
            } else {
                if (usr === real_users[0].auth0ID) {
                    res.json({
                        status: "success",
                        message: "url parameters parsing",
                        query: parsed,
                        data: users
                    });
                } else {
                    res.json({
                        status: "error",
                        message: `logged in user: ${usr} not equals to user: ${users}`,
                    });
                }
            }
        });

    }

};
// Handle create users actions
exports.new = function (req, res) {
    var users = new Users();
    users.name = req.body.name ? req.body.name : users.name;
    users.email = req.app.get("usr-mail");
    users.auth0ID = req.app.get("usr");
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
        var usr = req.app.get("usr");
        var real_users = JSON.parse(JSON.stringify(users));
        if (usr === real_users.auth0ID) {
            res.json({
                message: 'Users details loading..',
                data: users
            });
        }
    });
};
// Handle update users info
exports.update = function (req, res) {

    Users.findById(req.params.users_id, function (err, users) {
        if (err)
            res.send(err);

        users.name = req.body.name ? req.body.name : users.name;
        users.email = req.body.email ? req.body.email : users.email;
        users.auth0ID = req.app.get("usr");
        // save the users and check for errors
        var usr = req.app.get("usr");
        var real_users = JSON.parse(JSON.stringify(users));
        if (usr === real_users.auth0ID) {
            users.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Users Info updated',
                    data: users
                });
            });
        }
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
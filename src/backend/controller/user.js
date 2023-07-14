const bcrypt = require('bcrypt');
const User = require('./../models/user');
const Membership = require('./../models/membership');
const Invoice = require('./../models/invoice');
const jsonwebtoken = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    console.log('begin sign up');

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => {
                    let start_date = new Date();
                    let end_date = new Date();
                    end_date.setMonth(end_date.getMonth() + 1);
                    let membership = new Membership({
                        user_id: user._id,
                        active: true,
                        credit: 3,
                        start_date: start_date.toISOString().slice(0, 10),
                        end_date: end_date.toISOString().slice(0, 10)
                    });
                    membership.save()

                    res.status(201).json({
                        message: 'User created'
                    });
                })
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
}

exports.login = (req, res, next) => {
    console.log('begin login');
    const secret_token = req.body.email == "admin@gmail.com" ? "secret_admin_token" : "secret_user_token";
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'User not found'
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Incorrect password'
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        name: user.name,
                        email: user.email,
                        token: jsonwebtoken.sign({
                                userId: user._id
                            },
                            secret_token, {
                                expiresIn: '24h'
                            }
                        )
                    });
                })
                .catch(error => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
}

exports.getAllUsers = (req, res, next) => {
    console.log("get all users")
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({
            error
        }));
}

exports.getOneUser = (req, res, next) => {
    console.log("get one user")
    User.findOne({
            _id: req.params.id
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({
            error
        }));
}

exports.getAllUsersWithMembership = (req, res, next) => {
    console.log("get all users with membership")
    User.find()
        .then(users => {
            let users_with_membership = []
            users.forEach(user => {
                Membership.find({
                        user_id: user._id
                    })
                    .then(membership => {
                        users_with_membership.push({
                            user: user,
                            membership: membership[0]
                        })
                        if (users_with_membership.length == users.length) {
                            res.status(200).json(users_with_membership)
                        }
                    })
                    .catch(error => res.status(400).json({
                        error
                    }));
            });
        })
        .catch(error => res.status(400).json({
            error
        }));
}

exports.userCheckIn = (req, res, next) => {
    console.log("user check in")
    let membership_id = null
    let new_credit_nb = null
    let date = new Date();
    Membership.find({
            user_id: req.params.id
        }) //id is the user_id
        .then(membership => {
            membership_id = membership[0]._id
            new_credit_nb = membership[0].credit - 1
            if (membership[0].credit == 0) {
                return res.status(202).json({
                    message: 'Membership credit is 0'
                });
            }
            if (date < membership[0].start_date || date > membership[0].end_date) {
                return res.status(202).json({
                    message: 'Membership date period is not valid'
                });
            }
            if (membership[0].active == false) {
                return res.status(202).json({
                    message: 'Membership is canceled'
                });
            }

            // User can check in

            // editing membership credit
            Membership.updateOne({
                    _id: membership_id
                }, {
                    credit: new_credit_nb
                })
                .catch(error => res.status(400).json({
                    error
                }));

            // editing invoice
            Invoice.find({
                    user_id: req.params.id,
                    year: date.getFullYear(),
                    month: date.getMonth() + 1
                })
                .then(invoice => {
                    if (invoice.length == 0) {
                        // create invoice
                        console.log("creating invoice")
                        let new_invoice = new Invoice({
                            user_id: req.params.id,
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            date: date,
                            description: `${date.getFullYear()}-${date.getMonth()+1} bill`,
                            total_amount: 5,
                            invoices_lines: [{
                                item_id: 1,
                                description: `Yoga session - ${date.toDateString()}`,
                                amount: 5
                            }]
                        });
                        new_invoice.save()
                            .catch(error => res.status(400).json({
                                error
                            }));
                    } else {
                        // add invoice line
                        Invoice.updateOne({
                                _id: invoice[0]._id
                            }, {
                                $push: {
                                    invoices_lines: {
                                        "item_id": invoice[0].invoices_lines.length + 1,
                                        "description": `Yoga session - ${date.toDateString()}`,
                                        "amount": 5
                                    }
                                }
                            })
                            .catch(error => res.status(400).json({
                                error
                            }));
                        //update invoice total amount
                        Invoice.updateOne({
                                _id: invoice[0]._id
                            }, {
                                $inc: {
                                    total_amount: 5
                                }
                            })
                            .catch(error => res.status(400).json({
                                error
                            }));
                    }
                })
                .catch(error => res.status(404).json({
                    error
                }));

            res.status(200).json({
                message: 'User check in success'
            });
        })
        .catch(error => res.status(404).json({
            error: 'User not found'
        }))
}
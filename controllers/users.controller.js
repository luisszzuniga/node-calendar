const db = require('../db/db.js');
const UpdatePasswordRequest = require('../requests/UpdatePasswordRequest.js');
const UpdateUserRequest = require('../requests/UpdateUserRequest.js');
const User = db.user;
const bcrypt = require('bcrypt');

exports.all = async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
}

exports.get = async (req, res) => {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
}

exports.getAllUsersOfTeam = async (req, res) => {
    // A refaire quand j'aurais compris les relations MangoDB
    const users = await User.find({
        team_id: req.params.teamId
    });

    res.status(200).json(users);
}

exports.update = async (req, res) => {
    const { error, value } = UpdateUserRequest.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    }

    const user = await User.findById(req.params.id);
    user.username = value.username;
    user.email = value.email;
    await user.save();

    res.status(200).json(user);
}

exports.updatePassword = async (req, res) => {
    const { error, value } = UpdatePasswordRequest.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    }

    const user = await User.findById(req.params.id);
    
    if (! await bcrypt.compare(value.old_password, user.password)) {
        return res.status(400).json({ error: "Le mot de passe actuel est incorrect." });
    }

    user.password = await bcrypt.hash(value.password, 10);
    await user.save();

    res.status(200).json(user);
}

exports.destroy = async (req, res) => {
    const user = await User.findById(req.params.id);
    user.deleteOne();

    res.status(200).json({ "message": "success" });
}
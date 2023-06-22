const db = require('../db/db.js');
const User = require('../models/User.js');
const CreateTeamRequest = require('../requests/CreateTeamRequest.js');
const UpdateTeamRequest = require('../requests/UpdateTeamRequest.js');
const Team = db.team;

exports.all = async (req, res) => {
    // REQ.USER
    const teams = await Team.find();

    res.status(200).json(teams);
}

exports.get = async (req, res) => {
    const team = await Team.findById(req.params.id);

    res.status(200).json(team);
}

exports.store = async (req, res) => {
    const { error, value } = CreateTeamRequest.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    }

    const team = new Team({
        name: value.name,
        description: value.description,
        creatorUser: value.creatorUser
    });

    try {
        await team.save();
    } catch (error) {
        res.status(400).json(error.errors);
    }

    const returnTeam = await Team.findById(team._id).populate("creatorUser").exec();

    res.status(201).json(returnTeam);
}

exports.update = async (req, res) => {
    const { error, value } = UpdateTeamRequest.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    }

    const team = await Team.findById(req.params.id).populate("creatorUser");
    // if (team.creatorUser.username != req.user.username) {
    //     return res.status(401).json({ error: "Unauthorized" })
    // }
    
    team.name = value.name;
    team.description = value.description;

    try {
        await team.save();
    } catch (error) {
        return res.status(400).json(error.errors);
    }

    res.status(200).json(team);
}

exports.destroy = async (req, res) => {
    const team = await Team.findById(req.params.id).populate("creatorUser");
    // if (team.creatorUser.username != req.user.username) {
    //     return res.status(401).json({ error: "Unauthorized" })
    // }
    team.deleteOne();

    res.status(200).json({ "message": "success" });
};
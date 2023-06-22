const mongoose = require('mongoose');

const Team = mongoose.model(
    "Team",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true
        },

        creatorUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    })
);

module.exports = Team;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("../models/User.js");
db.team = require("../models/Team.js");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
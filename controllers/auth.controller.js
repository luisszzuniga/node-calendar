const db = require('../db/db.js');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CreateUserRequest = require('../requests/CreateUserRequest.js');
const secret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { error, value } = CreateUserRequest.validate(req.body);

    if (error) {
        return res.status(400).json(error);
    }

    const cryptedPassword = await bcrypt.hash(value.password, 10);
    const user = new User({
        username: value.username,
        email: value.email,
        password: cryptedPassword
    });

    try {
        await user.save()
    } catch (err) {
        return res.status(400).json(err);
    }

    res.status(201).json(user);
}



exports.login = async (req, res) => {
    // Dans la variable username il peut y avoir un username OU un email
    const { username, password } = req.body;

    const user = await User.findOne({ $or: [{username: username}, {email: username}] });
    
    if (! user) {
        return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (! isPasswordCorrect) {
        return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });

    res.status(200).json({ token: 'Bearer ' + token, user: user });
}
const bc = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model');

router.get('/secret', (req, res, next) => {
    if (req.headers.authorization) {
        bc.hash(req.headers.authorization, 8, (err, hash) => {
            if (err) {
                res.status(500).json({ errorMessage: "Oops! It broke." });
            } else {
                res.status(200).json({ hash });
            }
        })
    } else {
        res.status(400).json({ errorMessage: "Missing header" });
    }
});

router.post('/register', (res, res) => {
    let user = req.body;
    const hash = bc.hashSync(req.body.password, 8);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findby({ username })
    .first()
    .then(user => {
        if (user && bc.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome, ${user.username}!` });
        } else {
            res.status(401).json({ errorMessage: 'Invalid Credentials.' });
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;
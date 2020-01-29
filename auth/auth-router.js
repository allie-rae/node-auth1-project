const bc = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model.js");

router.get("/secret", (req, res, next) => {
    if (req.headers.authorization) {
        bc.hash(req.headers.authorization, 8, (err, hash) => {
            if (err) {
                res.status(500).json({ oops: "it broke" });
            } else {
                res.status(200).json({ hash });
            }
        });
    } else {
        res.status(400).json({ error: "missing header" });
    }
});

router.post("/register", (req, res) => {
    let user = req.body;

    const hash = bc.hashSync(req.body.password, 8);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            req.session.user = user;
            res.status(201).json(saved);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bc.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
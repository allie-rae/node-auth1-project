const db = require('../database/dbConfig');

module.exports = {
    add, 
    find, 
    findby, 
    findbyId
};

function find() {
    return db("users").select("id", "username");
};

function findby(filter) {
    return db("users")
    .select("id", "username", "password")
    .where(filter);
};

function add(user) {
    return db("users")
    .insert(user, "id")
    .then(ids => {
        const [id] = ids;
        return findbyId(id);
    });
};

function findById(id) {
    return db("users")
    .select("id", "username")
    .where({ id })
    .first();
};

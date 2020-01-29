const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');
const dbConnection = require('../database/dbConfig');
const KnexSessionStore = require('connect-session-knex')(session);


const sessionConfig = {
    name: 'allies awesome project',
    // THIS SHOULD NOT BE HARDCODED IN
    secret: process.env.SESSION_SECRET || 'The Cookie Monster likes to eat cookies',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, // REAL WORLD WOULD BE TRUE
      httpOnly: true // can't be accessed by js
    },
    resave: false,
    saveUninitialized: false, //If this is true you will be arrested... just keep it as false.
    store: new KnexSessionStore(
      {
        knex: dbConnection,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
      }
    )
  }

  module.exports = function(server) {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(session(sessionConfig));
};


module.exports = (req, res, next) => {

  // as long as someone has a valid username and password
  // that we have already validated,
  // they should have access
  // username/password should not be in the headers (ever)
  // grab a cookie instead 

        if (req.session && req.session.user) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }

};

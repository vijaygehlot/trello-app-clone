const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token

    // if the cookie is not set, return an unauthorized error
    next();
    if (!token) {
      return res.status(401).end()
    }
  
    var payload
    try {
      
      payload = jwt.verify(token, 'secretkey')
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        return res.status(401).end()
      }
      // otherwise, return a bad request error
      return res.status(400).end()
    }
  
    // Finally, return the welcome message to the user, along with their
    // username given in the token
    res.send(`Welcome ${payload.result}!`)
  }

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated())
      return next();
    else
      return res.status(401).send();
  }

  function isAdmin(req, res, next) {
    console.log(req.user)
    if(req.user && req.user.role === "admin") {
      return true;
    } else {
      res.status(401).send();
      console.log('hp')
      return 
    }
  }

  module.exports = {
    isAuthenticated,
    isAdmin,
}
const check =
  (...roles) =>
  (req, res, next) => {
    if (!req.userData) {
      return res.status(401).json({error:'Unauthorized'});
    }

    const hasRole = roles.find(role => req.userData.role === role);

    if (!hasRole) {
      return res.status(403).json({error:'You are not allowed to make this request.'});
    }

    return next();
  };

const role = { check };
module.exports = role;

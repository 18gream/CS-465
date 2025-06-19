const passport = require('passport');
const mongoose = require('mongoose');
const userModel = mongoose.model('users');

// REGISTER controller
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const user = new userModel();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    await user.save(); // Mongoose v7+ requires promise-based save()

    const token = user.generateJWT();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LOGIN controller
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      const token = user.generateJWT();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

//Authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      console.log('Token Validation Error!', err.message);
      return res.status(401).json({ message: 'Token validation failed' });
    }

    req.auth = verified;
    next();
  });
};


module.exports = {
  register,
  login,
  authenticateJWT
};

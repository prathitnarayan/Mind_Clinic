const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.compare(req.body.password)))
    return res.sendStatus(401);

  res.json({ token: jwt.sign({ id: user._id }, process.env.JWT_SECRET) });
};

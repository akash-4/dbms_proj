exports.init = (req, res) => {
  if (req.session.key)
    return res.sendSuccess({
      loggedIn: true,
      userDetails: {
        name: req.session.key.name,
        email: req.session.key.email,
        user_id: req.session.key.user_id,
        role: req.session.key.role,
      },
    });
  else
    return res.sendSuccess({
      loggedIn: false,
    });
};

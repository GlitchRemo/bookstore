const authenticate = (req, res, next) => {
	const { users } = req.app;
	const username = req.cookies?.username;

	if (users.isValid(username)) {
		next();
		return;
	}

	res.redirect(302, "/pages/login.html");
};

module.exports = { authenticate };

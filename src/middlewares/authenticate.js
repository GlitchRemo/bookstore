const authenticate = (req, res, next) => {
	if (req.cookies.username) {
		next();
		return;
	}

	res.redirect(301, "/pages/login.html");
};

module.exports = { authenticate };

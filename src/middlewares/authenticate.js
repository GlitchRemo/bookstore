const authenticate = (req, res, next) => {
	if (req.cookies.username) {
		//check for valid user
		next();
		return;
	}

	res.redirect(303, "/pages/login.html");
};

module.exports = { authenticate };

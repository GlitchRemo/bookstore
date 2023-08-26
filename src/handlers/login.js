const userLogin = (req, res) => {
	const { username, password } = req.body;

	res.cookie("username", username);
	res.redirect(301, "/");
};

const isUserLoggedIn = (req) => req.cookies?.username;

const sendUserCredentials = (req, res) => {
	if (isUserLoggedIn(req)) {
		res.send({ username: req.cookies.username, login: true });
		return;
	}

	res.send(401);
};

module.exports = { userLogin, sendUserCredentials };

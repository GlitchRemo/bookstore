const logoutUser = (req, res) => {
	res.clearCookie("username");
	res.redirect(301, "/");
};

module.exports = { logoutUser };

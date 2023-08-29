const logoutUser = (req, res) => {
	res.clearCookie("username");
	res.redirect(302, "/");
};

module.exports = { logoutUser };

class Users {
	constructor() {}

	authenticate(username, password) {
		return username === "Riya" && password === "123";
	}
}

module.exports = Users;

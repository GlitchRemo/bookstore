class Users {
	#users;

	constructor() {
		this.#users = [{ name: "Riya", password: "123", favourites: [] }];
	}

	authenticate(username, password) {
		return username === "Riya" && password === "123";
	}

	addToFavourite(username, bookTitle) {
		this.#users[0].favourites.push(bookTitle);
	}
}

module.exports = Users;

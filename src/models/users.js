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

	get favourites() {
		return this.#users[0].favourites;
	}
}

module.exports = Users;

class Users {
	#users;

	constructor(usersData) {
		this.#users = usersData || [
			{ name: "Riya", password: "123", favourites: [] },
		];
	}

	authenticate(username, password) {
		return username === "Riya" && password === "123";
	}

	addToFavourite(username, bookId) {
		this.#users[0].favourites.push(bookId);
	}

	get favourites() {
		return this.#users[0].favourites;
	}
}

module.exports = Users;

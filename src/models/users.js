class Users {
	#users;

	constructor(usersData) {
		this.#users = usersData;
	}

	add(username, password) {
		this.#users.push({ username, password, favourites: [] });
	}

	authenticate(username, password) {
		return this.#users.some(
			(user) => user.username === username && user.password === password
		);
	}

	addToFavourite(username, book) {
		this.#users
			.find((user) => user.username === username)
			.favourites.push(book);
	}

	getFavourites(username) {
		return this.#users.find((user) => user.username === username).favourites;
	}

	isValid(username) {
		return this.#users.some((user) => user.username === username);
	}

	get details() {
		return this.#users;
	}
}

module.exports = Users;

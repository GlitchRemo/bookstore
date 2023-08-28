class Users {
	#users;

	constructor(usersData) {
		this.#users = usersData || [
			{ username: "Riya", password: "123", favourites: [] },
		];
	}

	add(username, password) {
		this.#users.push({ username, password, favourites: [] });
	}

	authenticate(username, password) {
		return this.#users.some(
			(user) => user.username === username && user.password === password
		);
	}

	addToFavourite(username, bookId) {
		this.#users
			.find((user) => user.username === username)
			.favourites.push(bookId);
	}

	getFavourites(username) {
		return this.#users.find((user) => user.username === username).favourites;
	}
}

module.exports = Users;

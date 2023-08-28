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
		this.#users[0].favourites.push(bookId);
	}

	get favourites() {
		return this.#users[0].favourites;
	}
}

module.exports = Users;

class Books {
	#books;

	constructor(booksData) {
		this.#books = booksData || {
			flamingo: {
				id: "flamingo",
				title: "Flamingo",
				imgSrc: "/images/flamingo.jpg",
				description:
					// eslint-disable-next-line max-len
					"The prose selections aim to provide exposure to a wide variety of genres and themes, and writing from different parts of the world. They take into account the interests of young adults while making them aware of the socio-political issues that they will confront as they step into the world outside school. The tasks that follow the units provide opportunities for the development of language skills.",

				reviews: [],
			},
		};
	}

	get(id) {
		return this.#books[id];
	}

	getReviews(bookId) {
		return this.#books[bookId].reviews;
	}

	addReview(bookId, username, message) {
		this.#books[bookId].reviews.push({ username, message });
	}
}

module.exports = Books;

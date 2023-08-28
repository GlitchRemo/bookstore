class Books {
	#books;

	constructor(booksData) {
		this.#books = booksData || [
			{
				id: "flamingo",
				title: "Flamingo",
				imgSrc: "/images/flamingo.jpg",
				description:
					// eslint-disable-next-line max-len
					"The prose selections aim to provide exposure to a wide variety of genres and themes, and writing from different parts of the world. They take into account the interests of young adults while making them aware of the socio-political issues that they will confront as they step into the world outside school. The tasks that follow the units provide opportunities for the development of language skills.",

				reviews: [],
			},
			{
				id: "atomic-habits",
				title: "Atomic Habits",
				imgSrc: "/images/atomic-habits.jpg",
				description:
					// eslint-disable-next-line max-len
					"A supremely practical and useful book. James Clear distills the most fundamental information about habit formation, so you can accomplish more by focusing on less.",

				reviews: [],
			},
		];
	}

	get(bookId) {
		return this.#books.find((book) => book.id === bookId);
	}

	getTitle(bookId) {
		return this.#books.find((book) => book.id === bookId).title;
	}

	getReviews(bookId) {
		return this.#books.find((book) => book.id === bookId).reviews;
	}

	addReview(bookId, username, message) {
		this.#books
			.find((book) => book.id === bookId)
			.reviews.push({ username, message });
	}
}

module.exports = Books;

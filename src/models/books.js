class Books {
	#books;

	constructor(booksData) {
		this.#books = booksData;
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

	get details() {
		return this.#books;
	}
}

module.exports = Books;

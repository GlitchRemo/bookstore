const fs = require("fs");

const Books = require("./src/models/books");
const Users = require("./src/models/users");
const { createApp } = require("./src/app");
const StorageService = require("./src/controller/storage-service");

const USERS_STORAGE_PATH = "./users-storage.json";
const BOOKS_STORAGE_PATH = "./books-storage.json";

const main = () => {
	const usersStorage = new StorageService(fs, USERS_STORAGE_PATH);
	const booksStorage = new StorageService(fs, BOOKS_STORAGE_PATH);

	const users = new Users(usersStorage.fetch());
	const books = new Books(booksStorage.fetch());

	const app = createApp(users, books, usersStorage, booksStorage);

	const PORT = 8000;
	app.listen(PORT, () => console.log("Server is listening to port", PORT));
};

main();

const Books = require("./src/models/books");
const Users = require("./src/models/users");
const { createApp } = require("./src/app");

const main = () => {
	const users = new Users();
	const books = new Books();

	const app = createApp(users, books);

	const PORT = 8000;
	app.listen(PORT, () => console.log("Server is listening to port", PORT));
};

main();

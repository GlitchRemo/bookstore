const { createApp } = require("./src/app");
const Users = require("./src/models/users");

const main = () => {
	const users = new Users();
	const app = createApp(users);

	const PORT = 8000;
	app.listen(PORT, () => console.log("Server is listening to port", PORT));
};

main();

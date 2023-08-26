const renderAuthSection = (username) => {
	const authSection = document.querySelector("#auth-section");

	const usernameElement = document.createElement("p");
	usernameElement.innerText = username;

	const logoutElement = document.createElement("a");
	logoutElement.innerText = "Logout";
	logoutElement.href = "";

	authSection.replaceChildren(usernameElement, logoutElement);
};

const main = () => {
	fetch("/whoami")
		.then((res) => res.json())
		.then(({ login, username }) => {
			if (login) {
				renderAuthSection(username);
			}
		});
};

window.onload = main;

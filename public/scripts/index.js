const postLogoutRequest = () => {
	fetch("/logout", { method: "post" }).then((res) => {
		window.location.replace(res.url);
	});
};

const renderAuthSection = (username) => {
	const authSection = document.querySelector("#auth-section");

	const usernameElement = document.createElement("p");
	usernameElement.innerText = username;

	const logoutElement = document.createElement("a");
	logoutElement.href = "";
	logoutElement.innerText = "Logout";
	logoutElement.onclick = postLogoutRequest;

	const favouritesElement = document.createElement("a");
	favouritesElement.href = "/pages/favourites.html";
	favouritesElement.innerText = "Favourites";

	authSection.replaceChildren(
		usernameElement,
		logoutElement,
		favouritesElement
	);
};

const fetchAndRenderUsername = () => {
	fetch("/whoami")
		.then((res) => res.json())
		.then(({ login, username }) => {
			if (login) {
				renderAuthSection(username);
			}
		});
};

const main = () => {
	fetchAndRenderUsername();
};

window.onload = main;

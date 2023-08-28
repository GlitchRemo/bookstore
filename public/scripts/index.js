const createElement = (tagName, attributes, innerText) => {
	if (Array.isArray(attributes)) {
		const element = document.createElement(tagName);

		attributes.map(([name, value]) => element.setAttribute(name, value));
		element.innerText = innerText;

		return element;
	}

	const parent = document.createElement(tagName);
	parent.append(attributes);
	return parent;
};

const postLogoutRequest = () => {
	fetch("/logout", { method: "post" }).then((res) => {
		window.location.replace(res.url);
	});
};

const renderAuthSection = (username) => {
	const authSection = document.querySelector("#auth-section");

	const usernameElement = createElement("p", [], `Welcome ${username}`);

	const logoutElement = createElement(
		"div",
		createElement("a", [["href", ""]], "Logout")
	);

	logoutElement.onclick = postLogoutRequest;

	const favouritesElement = createElement(
		"div",
		createElement("a", [["href", "/pages/favourites.html"]], "Favourites")
	);

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

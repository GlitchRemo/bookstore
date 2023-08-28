const fetchAndRenderUsername = () => {
	fetch("/whoami")
		.then((res) => res.json())
		.then(({ username }) => {
			document.querySelector("#name-container").innerText = username;
		});
};

const createFavouriteElement = (bookId) => {
	const favouriteElement = document.createElement("a");

	favouriteElement.href = `/books/${bookId}`;
	favouriteElement.innerText = bookId;

	return favouriteElement;
};

const renderFavourites = (favourites) => {
	const favouritesContainer = document.querySelector("#favourites-container");
	const favouriteElements = favourites.map(createFavouriteElement);
	favouritesContainer.append(...favouriteElements);
};

const fetchAndRenderFavourites = () => {
	fetch("/user/favourites")
		.then((res) => res.json())
		.then(renderFavourites);
};

const main = () => {
	fetchAndRenderUsername();
	fetchAndRenderFavourites();
};

window.onload = main;

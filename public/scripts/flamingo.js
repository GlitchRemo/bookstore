const addToFavourite = () => {
	fetch("/user/favourites", {
		method: "post",
		body: { title: "flamingo" },
	});
};

const main = () => {
	const favouriteBtn = document.querySelector("#favourite-btn");

	favouriteBtn.onclick = () => {
		addToFavourite();
		favouriteBtn.style.color = "green";
	};
};

window.onload = main;

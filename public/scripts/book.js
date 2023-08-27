const addToFavourite = () => {
	const bookId = document.querySelector("title").innerText;

	fetch("/user/favourites", {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ bookId }),
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

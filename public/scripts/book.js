const createElement = (tag, text) => {
	const element = document.createElement(tag);
	element.innerText = text;
	return element;
};

const addToFavourite = () => {
	const bookId = document.querySelector("title").innerText;

	fetch("/user/favourites", {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ bookId }),
	});
};

const setupAddToFavourite = () => {
	const favouriteBtn = document.querySelector("#favourite-btn");

	favouriteBtn.onclick = () => {
		addToFavourite();
		favouriteBtn.style.color = "green";
	};
};

const createReviewElement = ({ username, message }) => {
	const nameElement = createElement("div", username);
	const messageElement = createElement("div", message);

	const reviewElement = document.createElement("article");
	reviewElement.classList.add("review");
	reviewElement.append(nameElement, messageElement);

	return reviewElement;
};

const appendReview = (review) => {
	const reviewsContainer = document.querySelector("#reviews-container");
	const reviewElement = createReviewElement(review);
	reviewsContainer.append(reviewElement);
};

const getReview = () => {
	const message = document.querySelector("#review-input-box").value;
	return { message };
};

const fetchAndAddReview = () => {
	const bookId = document.querySelector("title").innerText;

	fetch(`/books/${bookId}/review`, {
		method: "POST",
		body: JSON.stringify(getReview()),
		headers: { "Content-Type": "application/json" },
	})
		.then((res) => res.json())
		.then(appendReview);
};

const setupReviewForm = () => {
	const form = document.querySelector("form");

	form.onsubmit = (event) => {
		event.preventDefault();
		fetchAndAddReview();
		form.reset();
	};
};

const postLogoutRequest = () => {
	fetch("/logout", { method: "post" }).then((res) => {
		window.location.replace(res.url);
	});
};

const fetchAndRenderUsername = () => {
	fetch("/whoami")
		.then((res) => res.json())
		.then(({ username }) => {
			document.querySelector("#name-container").innerText = username;
		});
};

const main = () => {
	fetchAndRenderUsername();
	setupAddToFavourite();
	setupReviewForm();
};

window.onload = main;

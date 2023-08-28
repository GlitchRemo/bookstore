const getUserDetails = () => {
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;

	return { username, password };
};

const postUserDetails = () => {
	fetch("/register", {
		method: "post",
		body: JSON.stringify(getUserDetails()),
		headers: { "Content-Type": "application/json" },
	}).then((res) => {
		window.location.replace(res.url);
	});
};

const setupSignupForm = () => {
	const form = document.querySelector("form");

	form.onsubmit = (event) => {
		event.preventDefault();
		postUserDetails();
		form.reset();
	};
};

const main = () => {
	setupSignupForm();
};

window.onload = main;

const getUserDetails = () => {
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;

	return { username, password };
};

const postSignupDetails = () => {
	fetch("/login", {
		method: "post",
		body: JSON.stringify(getUserDetails()),
		headers: { "Content-Type": "application/json" },
	}).then((res) => {
		if (res.redirected) {
			window.location.replace(res.url);
			return;
		}

		alert("Bad credentials");
	});
};

const setupSignupForm = () => {
	const form = document.querySelector("form");

	form.onsubmit = (event) => {
		event.preventDefault();
		postSignupDetails();
		form.reset();
	};
};

const main = () => {
	setupSignupForm();
};

window.onload = main;

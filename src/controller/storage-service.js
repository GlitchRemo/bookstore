class StorageService {
	#fs;
	#storagePath;

	constructor(fs, storagePath) {
		this.#fs = fs
		this.#storagePath = storagePath;
	}

	fetch() {
		if (!this.#fs.existsSync(this.#storagePath)) {
		     	this.#fs.writeFileSync(this.#storagePath, "[]")
		}

		return JSON.parse(this.#fs.readFileSync(this.#storagePath, "utf-8"));
	}

	update(data) {
		return new Promise((resolve) => {
			this.#fs.writeFile(this.#storagePath, JSON.stringify(data), () =>
				resolve()
			);
		});
	}
}

module.exports = StorageService;

const logger = (req, res, next) => {
	console.log(`> Method: ${req.method} || URL: ${req.url}`);
	next();
};

module.exports = { logger };

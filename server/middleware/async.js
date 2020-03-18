module.exports = function asyncHandleError(handler) {
	return async (req, res, next) => {
		try {
			await handler(req, res);
		} catch (ex) {
			next(ex);
		}
	};
};

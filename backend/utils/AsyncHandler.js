function asyncHandler(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    }
  };
}

module.exports = { asyncHandler };

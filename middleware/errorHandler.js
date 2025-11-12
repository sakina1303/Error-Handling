const errorHandler = (err, req, res, next) => {
  // If headers already sent, delegate to default Express handler
  if (res.headersSent) {
    return next(err);
  }

  // Default to 500
  const status = err && err.status ? err.status : 500;

  // For internal server errors (5xx) don't expose the original message to clients
  const message = status >= 500 ? 'Internal Server Error' : (err && err.message ? err.message : 'Error');

  // Log original error for debugging
  if (err) console.error(err);

  res.status(status).json({ error: message });
};

export default errorHandler;


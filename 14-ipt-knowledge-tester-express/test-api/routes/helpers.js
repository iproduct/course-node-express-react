exports.replaceId = function(entity) {
  entity.id = entity._id;
  delete (entity._id);
  return entity;
}

exports.sendErrorResponse = function (req, res, statusCode, message, error) {
  res.status(statusCode || 404);
  res.json('error', {
    message,
    error: error || {}
  });
}
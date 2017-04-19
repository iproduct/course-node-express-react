exports.replaceId = function (entity) {
  entity.id = entity._id;
  delete (entity._id);
  return entity;
}

exports.sendErrorResponse = function (req, res, statusCode, message, error) {
  // development error handler
  // will print stacktrace
  if (req.get('env') === 'development') {
    res.status(statusCode || 500);
    res.json({
      'error': [{
        message,
        error: error || {}
      }]
    });
  } else {
    // production error handler
    // no stacktraces leaked to user
    res.status(statusCode || 500);
    res.json({
      'error': [{
        message,
        error: {}
      }]
    });
  }
}


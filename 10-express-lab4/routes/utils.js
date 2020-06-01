module.exports.sendErrorResponse = function(req, res, status, message, err) {
    if(req.get('env') !== 'development') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}
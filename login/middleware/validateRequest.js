function validateRequest(req, res, next) {
    if (req.body.username && req.body.password) {
        return next();
    }
    return res.status(400).json({ message: 'Error validating' });
}

module.exports = validateRequest

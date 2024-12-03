const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const validation = schema.validate(req[property], { allowUnknown: true });
        if (validation.error) {
            const errors = validation.error.details.map((e) => e.message);
            return res.status(400).json({ success: false, errors });
        }
        req.validatedData = validation.value;
        next();
    };
};

module.exports = { validateRequest };

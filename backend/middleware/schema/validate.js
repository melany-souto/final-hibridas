export function validate(schema) {
    return (req, res, next) => {
        // console.log("BODY ANTES DE VALIDAR:", req.body);
        schema
            .validate(req.body, {
                abortEarly: false,
                stripUnknown: true
            })
            .then((value) => {
                req.body = value;
                next();
            })
            .catch((err) => {
                console.error("Error de validación:", err.errors);
                res.status(400).json({
                    message: err.errors.join(", "),
                    details: err.errors
                });
            });
        }};
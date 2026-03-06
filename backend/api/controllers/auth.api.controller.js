import * as services from "../../services/users.service.js";

export function registerUser(req, res) {
    const { email, password, name, bio, avatar } = req.body;

    services.registerUser({ email, password, name, bio, avatar })
        .then((user) => res.json(user))
        .catch(err => res.status(400).json({ message: err.message }));
}

export function loginUser(req, res) {
    services.loginUser({ email: req.body.email, password: req.body.password })
        .then((data) => {
            console.log("Backend responde login:", data);
            res.json(data);
        })
        .catch(err => {
            console.error("Backend error login:", err);
            res.status(400).json({ message: err.message })
        });
}

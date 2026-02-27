// import * as services from "../../services/users.service.js";

// export function registerUser(req, res){
//     const { username, email, password } = req.body;

//     services.registerUser( username, email, password )
//         .then((user)=> res.json(user))
//         .catch(err=> res.status(400).json({ message: err.message }));
// }

// export function loginUser(req, res){
//     const { email, password } = req.body;

//     services.loginUser(email, password)
//         .then((data)=> res.json(data))
//         .catch(err=> res.status(400).json({ message: err.message }))
// }



import * as services from "../../services/users.service.js";

export function registerUser(req, res){
    const { email, password } = req.body;

    services.registerUser({ email, password })
        .then((user)=> res.json(user))
        .catch(err=> res.status(400).json({ message: err.message }));
}

// export function loginUser(req, res){
//     const { email, password } = req.body;

//     services.loginUser({ email, password })
//         .then((data)=> res.json(data))
//         .catch(err=> res.status(400).json({ message: err.message }))
// }

export function loginUser(req, res){
    console.log("💻 Login request body:", req.body);

    services.loginUser({ email: req.body.email, password: req.body.password })
        .then((data)=>{
            console.log("🎯 Backend responde login:", data);
            res.json(data);
        })
        .catch(err=>{
            console.error("❌ Backend error login:", err);
            res.status(400).json({ message: err.message })
        });
}

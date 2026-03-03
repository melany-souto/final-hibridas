import * as services from "../../services/users.service.js"

export async function getAllUsers( req, res ) {
    services.getUsers(req.query)
        .then((users) => res.status(200).json(users))
        .catch(err => res.status(500).json({ mensaje: "Error interno del servidor" }))
}

export async function getUserById( req, res ) {
    const id = req.params.id
    services.getUserById(id)
        .then(user => {
           if (!user) {
                return res.status(404).json({ mensaje: "Usuario no encontrado" });
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ mensaje: "Error interno del servidor" }))
}

// import { getUserByEmail } from "../services/users.service.js";

// export async function getUserByEmailController(req, res) {
//     try {
//         const { email } = req.params;
//         const user = await getUserByEmail(email);

//         if (!user) {
//             return res.status(404).json({ error: "Usuario no encontrado" });
//         }

//         res.json(user);
//     } catch (error) {
//         console.error("Error getUserByEmail:", error);
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// }

export async function createUser(req, res) {
    const user = {
        name: req.body.name,
        avatar: req.body.avatar,
        bio: req.body.bio,
        boards: []
    }
    services.createUser(user)
        .then(saved => res.status(201).json(saved))
        .catch(err => res.status(500).json({ mensaje: "No se guardó el usuario" }));
}

export async function updateUser( req, res ) {
    const id = req.params.id
    services.updateUser(id, req.body)
        .then(userEdited => res.status(202).json(userEdited))
        .catch(err => res.status(500).json({ mensaje: "no se pudo editar" }))
}

export async function deleteUserLog( req, res ) {
    const id = req.params.id
    services.deleteUserLog(id)
        .then((id) => res.status(202).json({ mensaje: `El usuario se eliminó correctamente` }))
        .catch(err => {
            res.status(500).json({ mensaje: "Error interno del servidor" });
        })
}
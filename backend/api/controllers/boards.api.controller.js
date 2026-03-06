import * as services from "../../services/boards.service.js";
import * as userService from "../../services/users.service.js"

import { ObjectId } from "mongodb";

export function getBoardById(req, res) {
    const id = req.params.boardId;

    services.getBoardById(id)
        .then(board => {
            if (!board) {
                return res.status(404).json({ message: "Tablero no encontrado" });
            }
            res.status(200).json(board);
        })
        .catch(err => {
            res.status(500).json({ message: "Error interno del servidor" });
        });
}

export function getBoardsByUser(req, res) {
    const userId = req.params.userId
    services.getBoardsByUser(userId)
        .then((boards) => res.status(200).json(boards))
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export function createBoard(req, res) {
    const board = {
        title: req.body.title,
        owner: new ObjectId(req.user.id),
        state: req.body.state || "active",
        recipes: [],
        sharedWith: [],
        eliminado: false,
        createdAt: new Date(),
        updateAt: new Date()
    };

    services.createBoard(board)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ message: "No se guardó el tablero" });
        });
}

export function updateBoard(req, res) {
    const id = req.params.boardId;

    services.updateBoard(id, req.body)
        .then(result => {
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Board no encontrado" });
            }

            res.status(202).json({
                message: "Board actualizado",
                result
            });
        })
        .catch(err => {
            console.error("Error updateBoard:", err);
            res.status(500).json({ message: "No se pudo editar" });
        });
}

export function addRecipeToBoard(req, res) {
    const { boardId } = req.params;
    const { recipeId } = req.body;

    if (!boardId) {
        return res.status(400).json({ message: "boardId faltante" });
    }
    if (!recipeId) {
        return res.status(400).json({ message: "recipeId faltante" });
    }
    if (recipeId.length !== 24) {
        return res.status(400).json({ message: "recipeId no es un ObjectId válido" });
    }

    services.addRecipeToBoard(boardId, recipeId)
        .then(() => {
            res.status(200).json({ message: "Receta agregada al tablero" });
        })
        .catch(err => {
            console.error("Error addRecipesToBoard:", err);
            res.status(500).json({ message: err.message || "Error al agregar receta al tablero" });
        });
}

export function deleteBoardLog(req, res) {
    const id = req.params.boardId

    services.deleteBoardLog(id)
        .then(() => res.status(202).json({ message: "El tablero se eliminó correctamente" }))
        .catch(err => res.status(500).json({ message: "Error al eliminar el tablero" }))
}

export function editBoardState(req, res) {
    const id = req.params.boardId;

    services.editBoardState(id, req.body.state)
        .then(() => res.status(200).json({ message: "El estado del menú se actualizó correctamente" }))
        .catch(err => res.status(500).json({ message: "Error al actualizar el estado del menú" }))
}


// funcion compartir

export function getBoardsShared(req, res) {
    const userId = req.params.userId;

    services.getBoardsShared(userId)
        .then(boards => {
            res.status(202).json(boards);
        })
        .catch(err => {
            res.status(500).json({ message: "Tableros no encontrados" });
        });
}

export async function shareBoard(req, res) {
    const board = req.params.boardId;
    const { email } = req.body;

    if (!email || !email.trim()) {
        return res.status(400).json({ message: "Email requerido" });
    }

    const user = await userService.getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log("Owner del boardDDD:", req.board.owner.toString());
    console.log("Usuario logueadoOOOOO:", req.user.id);
    if (req.board.owner.toString() === req.user.id.toString() && req.user.email === email) {
        return res.status(400).json({ message: "no puedes compartir el menú contigo mismo" })
    }

    services.shareBoard(board, user._id)
        .then(() => {
            res.status(202).json({ message: "Tablero compartido correctamente" });
        })
        .catch(err => {
            res.status(500).json({ message: "Error al compartir el tablero" });
        });
}

export function unshareBoard(req, res) {
    const board = req.params.boardId;
    const { targetUserId } = req.body;

    services.unshareBoard(board, targetUserId)
        .then(() => {
            res.status(202).json({ message: "Función compartir eliminada" });
        })
        .catch(err => {
            res.status(500).json({ message: "Error al desvincular tablero" });
        });
}
import * as service from "../../services/boards.service.js";

export async function loadBoard(req, res, next) {
    const boardId = req.params.boardId;

    console.log("📌 ID recibido en loadBoard ULTIMO:", boardId);  // 🔥 AQUÍ

    try {
        const board = await service.getBoardById(boardId);
         console.log("📌 Board encontradoOOO:", board);  // 🔥 Y AQUÍ
        if (!board) {
            return res.status(404).json({ mensaje: "Tablero no encontrado" });
             console.log("❌ No se encontró el boardDDDDD");  // 🔥 AQUÍ
        }

        req.board = board;
        next();
    } catch (error) {
        console.log("💥 Error en loadBoardDDDDD:", error);  // 🔥 AQUÍ
        res.status(500).json({ mensaje: "Error al cargar tablero", error });
    }
}

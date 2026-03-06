export function verifyBoardAccess(req, res, next) {
    const userId = req.user.id;
    const board = req.board;  //lo traigo del otro middleware

    if (!board) {
        return res.status(404).json({ message: "Tablero no encontrado" });
    }

    if (board.owner.toString() === userId.toString()) {
        return next();
    }

    if (board.sharedWith && 
        board.sharedWith.some(sharedWithId => sharedWithId.toString() === userId.toString())
    ) {
        return next();
    }

    return res.status(403).json({ message: "No tienes acceso a este tablero" })
}
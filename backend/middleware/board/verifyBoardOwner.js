export function verifyBoardOwner(req, res, next) {
    const userId = req.user?.id;
    const board = req.board;

    //  console.log("Owner del board:", req.board.owner); 
    // console.log("Usuario logueado:", req.user._id); 

    if (!userId) {
        return res.status(401).json({ message: "Usuario no autenticado OJO" });
    }

    if (!board) {
        return res.status(404).json({ message: "Tablero no encontrado OJO" });
    }

    if (board.owner.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Solo el propietario puede realizar esta acción" });
    }
    next();
}

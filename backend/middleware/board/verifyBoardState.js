export function verifyBoardState(req, res, next) {
    const boardState = req.board?.state;

    if (boardState !== "active") {
        return res.status(403).json({ message: "El tablero no puede editarse." });
    }

    next();
}

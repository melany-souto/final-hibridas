import { validateToken } from "../../services/token.service.js";

export async function verifyToken(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({ message: "Token no encontrado" });
        }

        const [bearer, token] = auth.split(" ");
        if (bearer !== "Bearer" || !token) {
            return res.status(401).json({ message: "Formato inválido" });
        }

        const user = await validateToken(token);

        if (!user) {
            return res.status(401).json({ message: "Token inválido" });
        }
        req.user = user; 
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Error en token" });
    }
}
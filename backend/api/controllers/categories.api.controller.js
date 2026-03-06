import * as service from "../../services/categories.service.js";

export function getCategories(req, res) {
    const { eliminado } = req.query;
    const filters = {};

    if (eliminado !== undefined) {
        filters.eliminado = eliminado === "true";
    }
    // console.log("FILTROS:", filters); //PROBANDO

    service.getCategories(filters)
        .then(categories => {
            // console.log("CATEGORIAS ENCONTRADAS:", categories);
            res.status(200).json(categories)
        })
        .catch(err => {
            // console.error("ERROR EN getCategories:", err);
            res.status(500).json({ mensaje: "Error interno del servidor" });
        });
}
import * as service from "../../services/categories.service.js";


export function getCategories(req, res) {
    const { activo, eliminado } = req.query;
    const filters = {};

    if (eliminado !== undefined) {
        filters.eliminado = eliminado === "true";
    }

    console.log("FILTROS:", filters); //PROBANDO

    service.getCategories(filters)
         .then(categories => {
        console.log("CATEGORIAS ENCONTRADAS:", categories);
        res.status(200).json(categories)
    })
        .catch(err => {
            console.error("ERROR EN getCategories:", err);
            res.status(500).json({ mensaje: "Error interno del servidor" });
        });
}

// export function getCategoryById(req, res) {
//     const id = req.params.id;

//     service.getCategoryById(id)
//         .then(category => {
//             if (category) {
//                 res.status(200).json(category);
//             } else {
//                 res.status(404).json({ mensaje: "Categoría no encontrada" });
//             }
//         })
//         .catch(err => res.status(500).json({ mensaje: "Error interno del servidor" }));
// }


// export function createCategory(req, res) {
//     const category = {
//         nombre: req.body.nombre,
//     };

//     service.createCategory(category)
//         .then(categorySaved => res.status(201).json(categorySaved))
//         .catch(err => res.status(500).json({ mensaje: "No se guardó la categoría" }));
// }


// export function updateCategory(req, res) {
//     const id = req.params.id;

//     service.updateCategory(req.body, id)
//         .then(result => res.status(202).json(result))
//         .catch(err => res.status(500).json({ mensaje: "No se pudo editar la categoría" }));
// }


// export function deleteCategoryLog(req, res) {
//     const id = req.params.id;

//     service.deleteCategory(id)
//         .then(() => res.status(202).json({ mensaje: "La categoría se eliminó correctamente" }))
//         .catch(err => res.status(500).json({ mensaje: "Error al eliminar la categoría" }));
// }
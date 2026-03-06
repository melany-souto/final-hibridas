import * as service from "../../services/recipes.service.js"
import { ObjectId } from "mongodb";

export function getAllRecipes(req, res) {

    const filter = {};

    if (req.query.categoryId)
        filter.categoryId = req.query.categoryId;

    if (req.query.difficulty)
        filter.difficulty = req.query.difficulty;

    if (req.query.title)
        filter.title = req.query.title;

    if (req.query.cook_time === "lt15")
        filter.cook_time = { $lt: 15 };

    if (req.query.cook_time === "15-30")
        filter.cook_time = { $gte: 15, $lte: 30 };

    if (req.query.cook_time === "gt30")
        filter.cook_time = { $gt: 30 };

    service.getAllRecipes(filter)
        .then((recipes) => {
            res.status(200).json(recipes);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error interno del servidor" });
        });
}

export async function getRecipeById(req, res) {
    const id = req.params.id
    service.getRecipeById(id)
        .then(recipe => {
            if (recipe) {
                res.status(200).json(recipe)
            } else {
                res.status(404).json({ message: "Receta no encontrado" })
            }
        })
        // .catch(err=> res.status(500).json({message:"Error interno del servidor"}))
        .catch(err => {
            console.error("ERROR REAL:", err);
            res.status(500).json({
                message: "Error interno del servidor",
                error: err.message
            });
        });
}

export async function getRecipesByUser(req, res) {
    const userId = req.params.userId
    //  console.log("userId RECIBIDO DE RECIPE:", userId);
    service.getRecipesByUser(userId)
        .then((recipes) => res.status(200).json(recipes))
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))

}

export function createRecipe(req, res) {
    const userId = req.user.id;
    const categoryId = req.body.categoryId;

    if (!userId) {
        return res.status(400).json({ message: "Usuario no autenticado" });
    }

    const recipe = {
        title: req.body.title,
        description: req.body.description,
        categoryId: new ObjectId(categoryId),
        image: req.body.image,
        ingredients: req.body.ingredients,
        cook_time: req.body.cook_time,
        difficulty: req.body.difficulty,
        method: req.body.method,
        video_link: req.body.video_link,
        userId: new ObjectId(userId)
    };

    return service.createRecipe(recipe)
        .then(recipeSaved => {
            return res.status(201).json(recipeSaved);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: "Error al guardar la receta" });
        });
}

export async function updateRecipe(req, res) {
    const userId = req.user.id;
    const recipeId = req.params.id;
    const categoryId = req.body.categoryId;

    if (!userId) {
        return res.status(400).json({ message: "Usuario no autenticado" });
    }

    const recipeData = {
        title: req.body.title,
        description: req.body.description,
        categoryId: new ObjectId(categoryId),
        image: req.body.image,
        ingredients: req.body.ingredients,
        cook_time: req.body.cook_time,
        difficulty: req.body.difficulty,
        method: req.body.method,
        video_link: req.body.video_link,
        userId: new ObjectId(userId)
    };

    return service.updateRecipe(recipeId, recipeData)
        .then(recipeUpdated => {

            if (!recipeUpdated) {
                return res.status(404).json({ message: "Receta no encontrada" });
            }

            return res.status(200).json(recipeUpdated); // ← NO 201
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: "Error al actualizar la receta" });
        });
}

export async function deleteRecipeLog(req, res) {
    const id = req.params.id

    service.deleteRecipeLog(id)
        .then(() => res.status(202).json({ message: `La receta se eliminó correctamente` }))
        .catch(err => res.status(500).json({ message: "Error al eliminar la receta" }))

}
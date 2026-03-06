import * as recipesService from "../../services/recipes.service.js";

export async function verifyRecipeOwner(req, res, next) {

  console.log("Middleware ejecutándose");
  // console.log("req.user completo:", req.user);
  try {
    const userId = req.user?.id?.toString();
    const recipeId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const recipe = await recipesService.getRecipeById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    // console.log("recipe.userId:", recipe.userId);
    // console.log("recipe.userId string:", recipe.userId.toString());
    // console.log("userId desde token:", userId);
    // console.log("typeof userId:", typeof userId);
    if (recipe.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Solo el propietario puede realizar esta acción"
      });
    }

    req.recipe = recipe;
    next();

  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
// import * as recipesService from "../../services/recipes.service.js";

// export async function verifyRecipeOwner(req, res, next) {
//     const userId = req.user?.id;
//     const recipeId = req.params.id;

//     console.log("userId desde token:", userId);
// console.log("recipe.userId:", recipe.userId.toString());

//     if (!userId) {
//         return res.status(401).json({ mensaje: "Usuario no autenticado" });
//     }

//     try {
//         const recipe = await recipesService.getRecipeById(recipeId);

//         if (!recipe) {
//             return res.status(404).json({ mensaje: "Receta no encontrada" });
//         }

//         if (recipe.userId.toString() !== userId.toString()) {
//             return res.status(403).json({ mensaje: "No tienes permiso para modificar esta receta" });
//         }

//         req.recipe = recipe; // opcional

//         next();
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ mensaje: "Error verificando permisos" });
//     }
// }



import * as recipesService from "../../services/recipes.service.js";

export async function verifyRecipeOwner(req, res, next) {
  const userId = req.user?.id || req.user?._id;
  const recipeId = req.params.id;

  console.log("USER FROM TOKEN:", req.user);
  console.log("userId desde token:", userId);
  console.log("recipeId desde params:", recipeId);

  if (!userId) {
    return res.status(401).json({ mensaje: "Usuario no autenticado" });
  }

  try {
    // ✅ PRIMERO obtener la receta
    const recipe = await recipesService.getRecipeById(recipeId);

    console.log("recipe.userId (DB):", recipe?.userId?.toString());

    if (!recipe) {
      return res.status(404).json({ mensaje: "Receta no encontrada" });
    }

    if (recipe.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ mensaje: "No tienes permiso para modificar esta receta" });
    }

    req.recipe = recipe;
    next();
  } catch (err) {
    console.error("verifyRecipeOwner ERROR:", err);
    return res.status(500).json({ mensaje: "Error verificando permisos" });
  }
}
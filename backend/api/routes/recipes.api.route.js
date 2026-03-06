import express from "express";
import { verifyToken } from "../../middleware/auth/verifyToken.js";
import { verifyRecipeOwner } from "../../middleware/recipe/verifyRecipeOwner.js";
import * as controller from "../controllers/recipes.api.controller.js";

import { validate } from "../../middleware/schema/validate.js";
import * as schema from "../../schemas/recipe.schema.js"

const route = express.Router();

// Rutas sin parámetros arriba
route.get("/", controller.getAllRecipes);

// Rutas específicas primero
route.get("/users/:userId", controller.getRecipesByUser);

route.get("/:id", controller.getRecipeById);

route.post("/", verifyToken, validate(schema.createRecipeSchema), controller.createRecipe);

route.patch("/:id", verifyToken, verifyRecipeOwner, validate(schema.updateRecipeSchema), controller.updateRecipe);

route.delete("/:id", verifyToken, verifyRecipeOwner, controller.deleteRecipeLog);

export default route;

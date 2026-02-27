

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getBoardById,
    addRecipeToBoard,
} from "../../services/board.service.js";
import { getRecipes } from "../../services/recipe.service.js";

export default function BoardDetail() {
    const { id } = useParams();

    const [board, setBoard] = useState({ recipes: [] });
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBoard();
        fetchRecipes();
    }, []);

    const fetchBoard = async () => {
        const data = await getBoardById(id);
        setBoard(data);
        console.log(data)
    }

    const fetchRecipes = async () => {
        const data = await getRecipes();
        setRecipes(data);
    }

    const handdleAddRecipe = async () => {
        if (!selectedRecipe) return;
        await addRecipeToBoard(id, selectedRecipe);
        fetchBoard();
        setSelectedRecipe("");
    }


    return (
        <div>
            <h2>{board.title}</h2>
<button onClick={() => navigate(`/boards/${board._id}/share`)}>
  Compartir tablero
</button>
            <h3>Recetas a utilizar</h3>


            {board.recipes.length === 0 ? (
                <p>No hay recetas en este tablero.</p>
            ) : (
                board.recipes.map((recipeId) => {
                    const recipe = recipes.find(r => r._id === recipeId);

                    return (
                        <div key={recipeId}>
                            {recipe ? (
                                <Link 
                                    to={`/recipes/${recipe._id}`}
                                    // target="_blank" 
                                    // rel="noopener noreferrer"
                                    style={{ textDecoration: "none", color: "orange" }}
                                    >
                                    {recipe.title}
                                </Link>
                            ) : (
                                "Cargando..."
                            )}
                        </div>
                    );
                })
            )}

            <h3>Agregar receta</h3>

            <select onChange={(e) => setSelectedRecipe(e.target.value)}>
                <option value="">Seleccionar receta</option>
                {recipes.map((rec) => (
                    <option key={rec._id} value={rec._id}>
                        {rec.title}
                    </option>
                ))}
            </select>

            <button onClick={handdleAddRecipe}>Agregar</button>
        </div>
        
    );

};
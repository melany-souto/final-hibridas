import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard.jsx";
import BoardCard from "../components/BoardCard.jsx";
import { useState, useEffect } from "react";
import { getRecipes } from "../services/recipe.service.js"
// import { getBoards } from "../services/board.service.js"

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipes()
      .then(res => setRecipes(res))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="text-center">
      <h1 className="mb-4 text-indigo fw-bold">Bienvenido a Recetas Facil</h1>

      {/* Sección Recetas */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-indigo">Recetas</h2>
        <Link to="/recipes/new" className="btn btn-primary">
          + Agregar receta
        </Link>
      </div>
      <div className="row justify-content-center mb-5">
  {recipes.map(recipe => (
    <div key={recipe._id} className="col-md-4 mb-4">
      <Link to={`/recipes/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <RecipeCard recipe={recipe} />
      </Link>
    </div>
  ))}
</div>

      {/* Sección Tableros */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-indigo">Tableros</h2>
        <Link to="/boards/new" className="btn btn-primary">
          + Nuevo tablero
        </Link>
      </div>
      <div className="row justify-content-center">
        {boards.map(board => (
          <BoardCard key={board._id} board={board} />
        ))}
      </div>
    </div>
  );
}

import { useSearchParams } from "react-router-dom";
import { getRecipes } from "../../services/recipe.service.js";
import RecipeCard from "../../components/RecipeCard.jsx";
import { useState, useEffect } from "react";

export default function AllRecipes() {

  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const titleFromUrl = searchParams.get("title") || "";

  const [recipes, setRecipes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: "",
    cook_time: "",
    title: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipes({ 
      categoryId, 
      ...filters, 
      title: titleFromUrl 
    })
      .then(res => setRecipes(res))
      .catch(err => setError(err.message));
  }, [categoryId, filters]);

  return (
    <div className="container">
      <button
        className="btn btn-outline-secondary my-3"
        onClick={() => setShowFilters(!showFilters)}
      >
        Filtrar
      </button>

      {showFilters && (
        <div className="card p-3 mb-3">

          <input
            type="text"
            placeholder="Buscar por título"
            className="form-control mb-2"
            onChange={(e) =>
              setFilters({ ...filters, title: e.target.value })
            }
          />

          <select
            className="form-select mb-2"
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
          >
            <option value="">Todas las dificultades</option>
            <option value="easy">Fácil</option>
            <option value="medium">Media</option>
            <option value="hard">Difícil</option>
          </select>

          <select
  className="form-select"
  onChange={(e) =>
    setFilters({ ...filters, cook_time: e.target.value })
  }
>
  <option value="">Cualquier tiempo</option>
  <option value="lt15">Menos de 15 min</option>
  <option value="15-30">Entre 15 y 30 min</option>
  <option value="gt30">Más de 30 min</option>
</select>

        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {recipes.length === 0 && !error && (
        <div>No hay recetas disponibles</div>
      )}

      <div className="row">
        {recipes.map(recipe => (
          <div key={recipe._id} className="col-md-4 mb-4">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

    </div>
  );
}
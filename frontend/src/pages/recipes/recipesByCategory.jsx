import { useParams } from "react-router-dom";
import { getRecipes } from "../../services/recipe.service.js"; 
import RecipeCard from "../../components/RecipeCard.jsx";
import { useState, useEffect } from "react";

export default function RecipesByCategory() {
  const { categoryId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: "",
    cook_time: "",
    title: ""
  })
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipes({ categoryId, ...filters }) 
      .then(res => setRecipes(res))
      .catch(err => setError(err.message));
  }, [categoryId, filters]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!recipes.length) return <div>No hay recetas en esta categoría</div>;

  return (
    <div>

      <button
        className="btn btn-outline-secondary mb-3"
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

          <input
            type="number"
            placeholder="Tiempo máximo (min)"
            className="form-control"
            onChange={(e) =>
              setFilters({ ...filters, cook_time: e.target.value })
            }
          />

        </div>
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


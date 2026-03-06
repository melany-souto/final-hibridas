import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard";
import { useUser } from "../../contexts/SessionContext";
import { getRecipesByUser } from "../../services/recipe.service";
import { Link } from "react-router-dom";

export default function MyRecipes() {
    const user = useUser();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        getRecipesByUser(user._id)
            .then(data => setRecipes(data))
            .catch((err) => {
                console.error(err);
                setError("Error al cargar tus recetas");
            });
    }, [user]);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-indigo">Recetas</h2>
                <Link to="/recipes/new" className="btn btn-primary">+ Agregar receta</Link>
            </div>

            {error && <div className="alert alert-danger mb-3">{error}</div>}

            {recipes.length === 0 && !error && (
                <div className="text-center mt-4">
                    <p className="text-muted">Aún no tienes ninguna receta.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/recipes/create")}
                    >
                        Crear la primera
                    </button>
                </div>
            )}

            <div className="row">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="col-md-4 mb-3">
                        <RecipeCard recipe={recipe} />
                    </div>
                ))}
            </div>
        </div>
    );
}
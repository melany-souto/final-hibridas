import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard";
import { useUser } from "../../contexts/SessionContext";
import { getRecipesByUser } from "../../services/recipe.service";

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
            <h2>Mis recetas</h2>

            {error && <p className="text-danger">{error}</p>}

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
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}
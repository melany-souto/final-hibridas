import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../../components/RecipeForm";
import { getCategories } from "../../services/category.service";
import { createRecipe } from "../../services/recipe.service";

export default function CreateRecipe() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (data) => {
    setSaving(true);
    setError("");

    createRecipe(data)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          setError(err.details?.join(", ") || err.message || "Datos inválidos");
        } else if (err.status === 401) {
          setError("No autorizado");
        } else {
          setError(err.message || "Error del servidor");
        }
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <div className="container mt-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-secondary ms-auto d-block"
      >
        Volver
      </button>
      {error && <div className="alert alert-danger mb-3">{error}</div>}

      <RecipeForm
        initialData={{
          title: "",
          description: "",
          categoryId: "",
          image: "",
          ingredients: [],
          cook_time: "",
          difficulty: "",
          method: "",
          video_link: "",
        }}
        categories={categories}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </div>
  );
}

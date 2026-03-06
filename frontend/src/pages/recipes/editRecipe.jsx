import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../../components/RecipeForm";
import { getCategories } from "../../services/category.service";
import { getRecipeById, editPartialRecipe } from "../../services/recipe.service";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories);
    getRecipeById(id).then(setRecipe);
  }, [id]);

  const handleSubmit = (data) => {
    setSaving(true);
    setError(null);

    editPartialRecipe(id, data)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error al editar:", err);

        if (err.status === 403) {
          setError("No tenés permiso para editar esta receta.");
        } else {
          setError("Ocurrió un error al guardar.");
        }
      })
      .finally(() => {
        setSaving(false);
      });
  };
  if (!recipe) return <p>Cargando...</p>;

  return (
    <>
      {error && <div className="alert alert-danger mb-3">{error}</div>}

      <RecipeForm
        initialData={recipe}
        categories={categories}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </>
  );
}

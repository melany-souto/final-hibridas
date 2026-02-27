
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

  useEffect(() => {
    getCategories().then(setCategories);
    getRecipeById(id).then(setRecipe);
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    await editPartialRecipe(id, data);
    navigate("/");
  };

  if (!recipe) return <p>Cargando...</p>;

  return (
    <RecipeForm
      initialData={recipe}
      categories={categories}
      onSubmit={handleSubmit}
      saving={saving}
    />
  );
}

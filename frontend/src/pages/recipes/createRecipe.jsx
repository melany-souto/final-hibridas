
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../../components/RecipeForm";
import { getCategories } from "../../services/category.service";
import { createRecipe } from "../../services/recipe.service";

export default function CreateRecipe() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (data) => {
    setSaving(true);
    await createRecipe(data);
    navigate("/");
  };

  return (
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
  );
}

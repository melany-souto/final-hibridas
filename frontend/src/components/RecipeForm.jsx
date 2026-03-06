
import { useState, useEffect } from "react";

export default function RecipeForm({ initialData, categories, onSubmit, saving }) {
  const [formData, setFormData] = useState(initialData);

  // useEffect(() => {
  //   setFormData(initialData);
  // }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: e.target.value.split(",").map((i) => i.trim()),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mt-4">
      <h2 className="mt-4">Nueva receta</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} className="form-control mb-2" placeholder="Título" required />

        <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="form-control mb-2">
          <option value="">Selecciona categoría</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <input name="image" value={formData.image} onChange={handleChange} className="form-control mb-2" placeholder="Imagen URL" />

        <input
          value={formData.ingredients.join(", ")}
          onChange={handleIngredientsChange}
          className="form-control mb-2"
          placeholder="Ingredientes"
        />

        <input name="cook_time" value={formData.cook_time} onChange={handleChange} className="form-control mb-2" placeholder="Tiempo de cocción" />

        <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="form-control mb-2">
          <option value="">Dificultad</option>
          <option value="easy">Fácil</option>
          <option value="medium">Media</option>
          <option value="hard">Difícil</option>
        </select>

        <textarea name="method" value={formData.method} onChange={handleChange} className="form-control mb-2" placeholder="Método" />

        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control mb-2" placeholder="Tips" />

        <input name="video_link" value={formData.video_link} onChange={handleChange} className="form-control mb-3" placeholder="Video URL" />

        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}

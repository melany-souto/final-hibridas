import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "../services/category.service";

export default function MenuBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories({ activo: true, eliminado: false });
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="text-center py-2">Cargando categorías...</div>;

  if (!categories.length)
    return <div className="text-center py-2 text-muted">No hay categorías disponibles</div>;

  return (
    <nav className="bg-light py-2 border-top border-bottom">
      <div className="container d-flex flex-wrap justify-content-start">
        {categories.map((category) => (
          <NavLink
            key={category._id}
            to={`/recipes?categoryId=${category._id}`}
            className="btn btn-outline-primary me-2 mb-2"
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
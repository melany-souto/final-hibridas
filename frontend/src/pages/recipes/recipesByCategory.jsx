// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import RecipeCard from "../../components/RecipeCard.jsx";
// import { getRecipes } from "../../services/recipe.service.js"
// export default function RecipesByCategory() {
//     const { id: categoryId } = useParams(); // <-- toma categoryId de la URL
//     const [recipes, setRecipes] = useState([]);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         getRecipes(categoryId)
//             .then(setRecipes)
//             .catch((err) => setError(err.message));
//     }, [categoryId]);

//     return (
//         <div className="text-center">
//             <h1 className="mb-4 text-indigo fw-bold">Recetas de la categoría</h1>

//             {error && <div className="alert alert-danger">{error}</div>}

//             <div className="row justify-content-center mb-5">
//                 {recipes.map((recipe) => (
//                     <div key={recipe._id} className="col-md-4 mb-4">
//                         <Link
//                             to={`/recipes/${recipe._id}`}
//                             style={{ textDecoration: "none", color: "inherit" }}
//                         >
//                             <RecipeCard recipe={recipe} />
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }





import { useParams } from "react-router-dom";
import { getRecipes } from "../../services/recipe.service.js"; // ruta corregida
import RecipeCard from "../../components/RecipeCard.jsx";
import { useState, useEffect } from "react";

export default function RecipesByCategory() {
  const { categoryId } = useParams(); // 🔑 id que viene de NavLink
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipes(categoryId) // 🔑 pasar categoryId, no nombre
      .then(res => setRecipes(res))
      .catch(err => setError(err.message));
  }, [categoryId]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!recipes.length) return <div>No hay recetas en esta categoría</div>;

  return (
    <div className="row">
      {recipes.map(recipe => (
        <div key={recipe._id} className="col-md-4 mb-4">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
}

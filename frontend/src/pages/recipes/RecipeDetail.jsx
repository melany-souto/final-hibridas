
// import { useState, useEffect } from "react";
// import { deleteRecipeLog, getRecipeById } from "../../services/recipe.service";
// import { Link, useNavigate, useParams } from "react-router-dom";

// export default function RecipeDetail() {
//   const { id } = useParams(); // obtiene el id de la URL
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getRecipeById(id)
//       .then(res => setRecipe(res))
//       .catch(() => setError("No se pudo cargar la receta"))
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handleDelete = () => {
//     setSaving(true);
//     deleteRecipeLog(id)
//       .then(() => {
//         setShowModal(false);
//         navigate("/"); // vuelve al listado de recetas
//       })
//       .finally(() => setSaving(false));
//   };

//   if (loading) return <p>Cargando receta...</p>;
//   if (error) return <p>{error}</p>;
//   if (!recipe) return <p>Receta no encontrada</p>;

//   return (
//     <div className="container mt-4">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card shadow-sm">
//             {recipe.image && (
//               <img
//                 src={recipe.image}
//                 className="card-img-top"
//                 alt={recipe.title}
//                 style={{ height: "300px", objectFit: "cover" }}
//               />
//             )}
//             <div className="card-body">
//               <h2 className="card-title">{recipe.title}</h2>
//               {recipe.category && (
//                 <h6 className="card-subtitle text-muted mb-3">{recipe.category}</h6>
//               )}

//               {recipe.description && <p className="card-text">{recipe.description}</p>}

//               <ul className="list-unstyled mt-3">
//                 {recipe.ingredients && (
//                   <li>
//                     <strong>Ingredientes:</strong> {recipe.ingredients.join(", ")}
//                   </li>
//                 )}
//                 {recipe.cook_time && (
//                   <li>
//                     <strong>Tiempo de cocción:</strong> {recipe.cook_time} minutos
//                   </li>
//                 )}
//                 {recipe.difficulty && (
//                   <li>
//                     <strong>Dificultad:</strong> {recipe.difficulty}
//                   </li>
//                 )}
//               </ul>

//               {recipe.method && (
//                 <div className="mt-3">
//                   <strong>Preparación:</strong>
//                   <p>{recipe.method}</p>
//                 </div>
//               )}

//               {recipe.video_link && (
//                 <div className="mt-2">
//                   <a
//                     href={recipe.video_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="btn btn-primary btn-sm"
//                   >
//                     Ver video
//                   </a>
//                 </div>
//               )}

//               <div className="d-flex justify-content-between mt-4">
//                 <Link to="/" className="btn btn-outline-secondary">
//                   Volver
//                 </Link>

//                 <div>
//                   <Link
//                     to={`/recipes/${recipe.id}/edit`}
//                     className="btn btn-outline-secondary me-2"
//                   >
//                     Editar
//                   </Link>

//                   <button
//                     className="btn btn-danger"
//                     onClick={() => setShowModal(true)}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MODAL */}
//         {showModal && (
//           <div
//             className="modal fade show d-block"
//             style={{ background: "rgba(0,0,0,0.4)" }}
//           >
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Confirmar eliminación</h5>
//                   <button
//                     className="btn-close"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>

//                 <div className="modal-body">
//                   ¿Seguro que querés eliminar esta receta?
//                 </div>

//                 <div className="modal-footer">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancelar
//                   </button>

//                   <button
//                     className="btn btn-danger"
//                     disabled={saving}
//                     onClick={handleDelete}
//                   >
//                     {saving ? "Eliminando..." : "Eliminar"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getRecipeById,
  deleteRecipeLog,
} from "../../services/recipe.service";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return; // 🔒 evita llamadas con undefined

    setLoading(true);
    setError("");

    getRecipeById(id)
      .then((data) => {
        setRecipe(data);
      })
      .catch(() => {
        setError("No se pudo cargar la receta");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (!id) return;

    setSaving(true);

    deleteRecipeLog(id)
      .then(() => {
        setShowModal(false);
        navigate("/");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) return <p className="text-center mt-4">Cargando receta...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;
  if (!recipe) return <p className="text-center mt-4">Receta no encontrada</p>;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
            )}

            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>

              {recipe.category && (
                <h6 className="card-subtitle text-muted mb-3">
                  {recipe.category}
                </h6>
              )}

              {recipe.description && (
                <p className="card-text">{recipe.description}</p>
              )}

              <ul className="list-unstyled mt-3">
                {recipe.ingredients?.length > 0 && (
                  <li>
                    <strong>Ingredientes:</strong>{" "}
                    {recipe.ingredients.join(", ")}
                  </li>
                )}

                {recipe.cook_time && (
                  <li>
                    <strong>Tiempo de cocción:</strong>{" "}
                    {recipe.cook_time} minutos
                  </li>
                )}

                {recipe.difficulty && (
                  <li>
                    <strong>Dificultad:</strong> {recipe.difficulty}
                  </li>
                )}
              </ul>

              {recipe.method && (
                <div className="mt-3">
                  <strong>Preparación:</strong>
                  <p>{recipe.method}</p>
                </div>
              )}

              {recipe.video_link && (
                <div className="mt-3">
                  <a
                    href={recipe.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Ver video
                  </a>
                </div>
              )}

              <div className="d-flex justify-content-between mt-4">
                {/* <Link to="/" className="btn btn-outline-secondary">
                  Volver
                </Link> */}
                <button onClick={() => navigate(-1)} className="btn btn-outline-secondary">
    Volver
</button>

                <div>
                  <Link
                    to={`/recipes/${recipe._id}/edit`}
                    className="btn btn-outline-secondary me-2"
                  >
                    Editar
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => setShowModal(true)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div
            className="modal fade show d-block"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar eliminación</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  ¿Seguro que querés eliminar esta receta?
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    className="btn btn-danger"
                    disabled={saving}
                    onClick={handleDelete}
                  >
                    {saving ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

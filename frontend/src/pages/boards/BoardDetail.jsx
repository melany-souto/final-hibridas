

// import { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   getBoardById,
//   addRecipeToBoard,
// } from "../../services/board.service.js";
// import { getRecipes } from "../../services/recipe.service.js";
// import { useUser } from "../../contexts/SessionContext";
// import { useNavigate } from "react-router-dom";
// import { editBoardState, deleteBoardLog, editPartialBoard } from "../../services/board.service.js";

// export default function BoardDetail() {
//   const { id } = useParams();
//   const user = useUser();
//   const navigate = useNavigate();

//   const [board, setBoard] = useState({ recipes: [] });
//   const [recipes, setRecipes] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState("");
//   const [error, setError] = useState("");
//   const [state, setState] = useState(board.state || "active");

//   useEffect(() => {
//     fetchBoard();
//     fetchRecipes();
//   }, []);

//   const fetchBoard = async () => {
//     const data = await getBoardById(id);
//     setBoard(data);
//     console.log(data)
//   }

//   const fetchRecipes = async () => {
//     const data = await getRecipes();
//     setRecipes(data);
//   }

//   const handdleAddRecipe = async () => {
//     if (!selectedRecipe) return;
//     await addRecipeToBoard(id, selectedRecipe);
//     fetchBoard();
//     setSelectedRecipe("");
//   }

//   const handleDelete = async () => {
//     if (!window.confirm("¿Estás seguro de que quieres eliminar este tablero?")) return;

//     deleteBoardLog(board._id)
//       .then(() => navigate("/boards"))
//       .catch(err => {
//         console.error("Error al eliminar el menú:", err);
//         setError("No se pudo eliminar el menú. Intenta nuevamente.");
//       });
//   }

//   const handleRemoveRecipe = (recipeId) => {
//     const newRecipes = board.recipes.filter(id => id !== recipeId);

//     editPartialBoard(id, { recipes: newRecipes })
//       .then(() => {
//         setBoard(prev => ({
//           ...prev,
//           recipes: newRecipes
//         }));
//       })
//       .catch(err => {
//         console.error("Error al eliminar receta del tablero:", err);
//         setError("No se pudo eliminar la receta del tablero. Intenta nuevamente.");
//       })
//   }

//   const handleChangeState = (newState) => {
//     editBoardState(id, newState)
//       .then(() => {
//         setBoard(prev => ({
//           ...prev,
//           state: newState
//         }));
//       })
//       .catch(err => {
//         console.error("Error al cambiar el estado del tablero:", err);
//         setError("No se pudo cambiar el estado del tablero. Intenta nuevamente.");
//       });
//   }

//   return (
//     <div className="container mt-4">

//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>{board.title}</h2>

//         <div>
//           {user && board.owner === user._id && (
//             <>
//               <button
//                 className="btn btn-outline-primary me-2"
//                 onClick={() => navigate(`/boards/${board._id}/share`)}
//               >
//                 Compartir
//               </button>

//               <button
//                 className="btn btn-danger"
//                 onClick={handleDelete}
//               >
//                 Eliminar
//               </button>
//               {/* Desplegable para cambiar estado */}
//               <div className="mb-3">
//                 <label className="form-label">Estado del tablero:</label>
//                 <select
//                   className="form-select"
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                 // disabled={loading} // evita cambios mientras actualiza
//                 >
//                   <option value="active">Activo</option>
//                   <option value="cancelled">Cancelado</option>
//                   <option value="finished">Terminado</option>
//                 </select>
//               </div>

//               {/* Botón para guardar */}
//               <button
//                 className="btn btn-success"
//                 onClick={handleChangeState()}
//               // disabled={loading}
//               >
//                 {/* {loading ? "Actualizando..." : "Actualizar estado"} */}
//               </button>

//             </>
//           )}
//         </div>
//       </div>

//       {/* Columna estilo Trello */}
//       <div
//         className="p-3 rounded"
//         style={{ backgroundColor: "#f4f5f7", maxWidth: "500px" }}
//       >
//         <h5 className="mb-3">Recetas del menú</h5>

//         {board.recipes.length === 0 ? (
//           <p className="text-muted">No hay recetas en este tablero.</p>
//         ) : (
//           board.recipes.map((recipeId) => {
//             const recipe = recipes.find(r => r._id === recipeId);
//             if (!recipe) return null;

//             return (
//               <div
//                 key={recipeId}
//                 className="card mb-2 shadow-sm"
//               >
//                 <div className="card-body d-flex justify-content-between align-items-center p-2">
//                   <Link
//                     to={`/recipes/${recipe._id}`}
//                     style={{ textDecoration: "none" }}
//                   >
//                     {recipe.title}
//                   </Link>

//                   {user && board.owner === user._id && (
//                     <button
//                       onClick={() => handleRemoveRecipe(recipeId)}
//                       className="btn btn-sm btn-outline-danger"
//                     >
//                       ❌
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         )}

//         {/* Agregar receta */}
//         {user && board.owner === user._id && (
//           <div className="mt-3">
//             <select
//               className="form-select mb-2"
//               value={selectedRecipe}
//               onChange={(e) => setSelectedRecipe(e.target.value)}
//             >
//               <option value="">Seleccionar receta</option>
//               {recipes.map((rec) => (
//                 <option key={rec._id} value={rec._id}>
//                   {rec.title}
//                 </option>
//               ))}
//             </select>

//             <button
//               className="btn btn-success w-100"
//               onClick={handdleAddRecipe}
//             >
//               + Agregar receta
//             </button>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }






import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getBoardById,
  addRecipeToBoard,
  editBoardState,
  deleteBoardLog,
  editPartialBoard
} from "../../services/board.service.js";
import { getRecipes } from "../../services/recipe.service.js";
import { useUser } from "../../contexts/SessionContext";

export default function BoardDetail() {
  const { id } = useParams();
  const user = useUser();
  const navigate = useNavigate();

  const [board, setBoard] = useState({ recipes: [] });
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("active"); // se inicializa por default

  // ─── Fetch inicial ─────────────────────────────
  useEffect(() => {
    fetchBoard();
    fetchRecipes();
  }, []);

  const fetchBoard = async () => {
    const data = await getBoardById(id);
    setBoard(data);
    setState(data.state || "active"); // ⚡ sincroniza state con la DB
  };

  const fetchRecipes = async () => {
    const data = await getRecipes();
    setRecipes(data);
  };

  // ─── Agregar receta ───────────────────────────
  const handdleAddRecipe = async () => {
    if (!selectedRecipe) return;
    await addRecipeToBoard(id, selectedRecipe);
    fetchBoard();
    setSelectedRecipe("");
  };

  // ─── Eliminar tablero ─────────────────────────
  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este tablero?")) return;

    deleteBoardLog(board._id)
      .then(() => navigate("/boards"))
      .catch(err => {
        console.error(err);
        setError("No se pudo eliminar el menú. Intenta nuevamente.");
      });
  };

  // ─── Eliminar receta del tablero ─────────────
  const handleRemoveRecipe = (recipeId) => {
    const newRecipes = board.recipes.filter(id => id !== recipeId);

    editPartialBoard(id, { recipes: newRecipes })
      .then(() => setBoard(prev => ({ ...prev, recipes: newRecipes })))
      .catch(err => {
        console.error(err);
        setError("No se pudo eliminar la receta del tablero. Intenta nuevamente.");
      });
  };

  // ─── Cambiar estado del tablero ──────────────
  const handleChangeState = (newState) => {
    editBoardState(id, newState)
      .then(() => setBoard(prev => ({ ...prev, state: newState })))
      .catch(err => {
        console.error(err);
        setError("No se pudo cambiar el estado del tablero. Intenta nuevamente.");
      });
  };

  // ─── Render ──────────────────────────────────
  return (
  <div className="container mt-4">
    {/* Header con botones */}
    <div className="d-flex justify-content-between align-items-start mb-4">
      <h2>{board.title}</h2>
      {user && board.owner === user._id && (
        <div className="d-flex flex-column align-items-end">
          {/* Botones de acción */}
          <div className="mb-2">
            <button
              className="btn btn-outline-primary me-2 mb-2"
              onClick={() => navigate(`/boards/${board._id}/share`)}
            >
              Compartir
            </button>
            <button className="btn btn-danger mb-2" onClick={handleDelete}>
              Eliminar
            </button>
          </div>

          {/* Desplegable y botón de estado */}
          <div className="d-flex flex-column align-items-end">
            <label className="form-label mb-1">Estado del tablero:</label>
            <select
              className="form-select mb-2"
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={{ minWidth: "150px" }}
            >
              <option value="active">Activo</option>
              <option value="cancelled">Cancelado</option>
              <option value="finished">Terminado</option>
            </select>
            <button
              className="btn btn-success"
              onClick={() => handleChangeState(state)}
            >
              Actualizar estado
            </button>
          </div>
        </div>
      )}
    </div>

    {/* Columna estilo Trello */}
    <div className="p-3 rounded" style={{ backgroundColor: "#f4f5f7", maxWidth: "500px" }}>
      <h5 className="mb-3">Recetas del menú</h5>

      {board.recipes.length === 0 ? (
        <p className="text-muted">No hay recetas en este tablero.</p>
      ) : (
        board.recipes.map((recipeId) => {
          const recipe = recipes.find(r => r._id === recipeId);
          if (!recipe) return null;

          return (
            <div key={recipeId} className="card mb-2 shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center p-2">
                <Link to={`/recipes/${recipe._id}`} style={{ textDecoration: "none" }}>
                  {recipe.title}
                </Link>

                {user && board.owner === user._id && (
                  <button
                    onClick={() => handleRemoveRecipe(recipeId)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    ❌
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}

      {/* Agregar receta */}
      {user && board.owner === user._id && (
        <div className="mt-3">
          <select
            className="form-select mb-2"
            value={selectedRecipe}
            onChange={(e) => setSelectedRecipe(e.target.value)}
          >
            <option value="">Seleccionar receta</option>
            {recipes.map((rec) => (
              <option key={rec._id} value={rec._id}>
                {rec.title}
              </option>
            ))}
          </select>

          <button className="btn btn-success w-100" onClick={handdleAddRecipe}>
            + Agregar receta
          </button>
        </div>
      )}
    </div>

    {error && <p className="text-danger mt-2">{error}</p>}
  </div>
);
}
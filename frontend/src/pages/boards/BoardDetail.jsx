import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getBoardById,
  addRecipeToBoard,
  editBoardState,
  deleteBoardLog,
  editPartialBoard,
  unshareBoard
} from "../../services/board.service.js";
import { getRecipes } from "../../services/recipe.service.js";
import { useUser } from "../../contexts/SessionContext";
// import { getUserById } from "../../services/users.service.js";

export default function BoardDetail() {
  const { id } = useParams();
  const user = useUser();
  const navigate = useNavigate();

  const [board, setBoard] = useState({ recipes: [], sharedWithUsers: [] });
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("active");
  const [newState, setNewState] = useState("active");

  useEffect(() => {
    fetchBoard();
    fetchRecipes();
  }, [id]);


  const fetchBoard = () => {
    getBoardById(id)
      .then((data) => {
        setBoard(data);
        setState(data.state || "active");
        setNewState(data.state || "active");
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar el menú");
      })
  };

  const fetchRecipes = () => {
    getRecipes()
      .then((data) => {
        setRecipes(data);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar las recetas");
      })
  }


  // Agregar receta
  const handdleAddRecipe = async () => {
    if (!selectedRecipe) return;

    addRecipeToBoard(id, selectedRecipe)
      .then(() => {
        fetchBoard();
        setSelectedRecipe("");
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo agregar la receta")
      })

  };

  // elimiinar tablero
  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este tablero?")) return;

    deleteBoardLog(board._id)
      .then(() => navigate("/boards"))
      .catch(err => {
        console.error(err);
        setError("No se pudo eliminar el menú. Intenta nuevamente.");
      });
  };

  // eliminar receta
  const handleRemoveRecipe = (recipeId) => {
    const newRecipes = board.recipes.filter(id => id !== recipeId);

    editPartialBoard(id, { recipes: newRecipes })
      .then(() =>
        setBoard(prev => ({ ...prev, recipes: newRecipes })))
      .catch(err => {
        console.error(err);
        setError("No se pudo eliminar la receta del tablero. Intenta nuevamente.");
      });
  };

  //cambiar estado
  const handleChangeState = (newState) => {
    editBoardState(id, newState)
      .then(() => {
        setBoard(prev => ({ ...prev, state: newState }));
        setState(newState);
      })
      .catch(err => {
        console.error(err);
        setError("No se pudo cambiar el estado del tablero. Intenta nuevamente.");
      });
  };

  //dejar de compartir
  const handleUnshare = (userId) => {
    if (!window.confirm("¿Quitar acceso a este usuario?")) return;

    unshareBoard(board._id, userId)
      .then(() => fetchBoard())
      .catch(err => {
        console.error(err);
        setError("No se pudo quitar el acceso");
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
      <h2 className="mt-4">Menú "{board.title}"</h2>
      {state !== "active" && (
        <div className="alert alert-warning mt-3 mb-5">
          Solo se pueden editar tableros activos.
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      <div className="d-flex flex-column flex-sm-row gap-3">

        {/*  Recetas en menú */}
        <div className="flex-grow-1 p-3 rounded bg-whitee">
          <h5 className="mb-3">Recetas del menú</h5>
          {(board.recipes || []).length === 0 ? (
            <p className="text-muted">No hay recetas en este tablero.</p>
          ) : (
            (board.recipes || []).map((recipeId) => {
              const recipe = recipes.find(r => r._id === recipeId);
              if (!recipe) return null;

              return (
                <div key={recipeId} className="card mb-2 shadow-sm">
                  <div className="card-body d-flex justify-content-between align-items-center p-2">
                    <Link to={`/recipes/${recipe._id}`} className="noDeco">
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
            <button className="btn btn-success w-100" onClick={handdleAddRecipe} disabled={state !== "active"}>
              + Agregar receta
            </button>
          </div>
        </div>

        {/* Panel botones */}
        <div className="d-flex flex-column gap-3 btnMinWidth">
          {/* Compartir */}
          <div className="border p-2 rounded bg-whitee">

            {user && board.owner === user._id && (
              <button
                className="btn btn-primary btn-sm mb-2 w-100"
                onClick={() => navigate(`/boards/${board._id}/share`)}
              >
                Compartir
              </button>
            )}

            <div className="text-muted font09">
              {user && board.owner === user._id ? (
                board.sharedWithUsers?.length > 0 ? (
                  <>
                    Compartido con:
                    <div className="mt-1">
                      {board.sharedWithUsers.map((u) => (
                        <span key={u._id} className="me-2">
                          {u.name}
                          <button
                            className="btn btn-sm btn-outline-secondary ms-1"
                            onClick={() => handleUnshare(u._id)}
                          >
                            X
                          </button>
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  "Compartido con: Nadie"
                )
              ) : (
                `Compartido por: ${board.ownerInfo?.[0]?.name || "Desconocido"}`
              )}
            </div>
          </div>

          {user && board.owner === user._id && (
            <button className="btn btn-danger btn-sm w-100" onClick={handleDelete}>
              Eliminar
            </button>
          )}

          <div className="d-flex flex-column align-items-start">
            <div className="d-flex justify-content-between w-100 pb-2 mt-4">
              <label className="form-label mb-1">Estado del tablero:</label>
              <span className={`badge ${state === "active" ? "bg-success" : state === "cancelled" ? "bg-danger" : "bg-secondary"}`}>
                {state.toUpperCase()}
              </span>
            </div>
            {user && board.owner === user._id && (
              <>
                <select
                  className="form-select mb-2 minw150"
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                >
                  <option value="active">Activo</option>
                  <option value="cancelled">Cancelado</option>
                  <option value="finished">Terminado</option>
                </select>

                <button
                  className="btn btn-success btn-sm mt-2"
                  onClick={() => handleChangeState(newState)}
                >
                  Actualizar estado
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
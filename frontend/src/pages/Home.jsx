
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard.jsx";
import BoardCard from "../components/BoardCard.jsx";
import { useState, useEffect } from "react";
import { getRecipes } from "../services/recipe.service.js";
import { getBoardsByUser } from "../services/board.service.js";
import { useUser } from "../contexts/SessionContext.jsx";

export default function Home() {
  const user = useUser();

  const [recipes, setRecipes] = useState([]);
  const [ownBoards, setOwnBoards] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);
  const [error, setError] = useState("");

  // carga recetas
  useEffect(() => {
    getRecipes()
      .then(res => {
        // console.log("DEBUG | Recetas cargadas:", res);
        setRecipes(res);
      })
      .catch(err => {
        // console.error("ERROR | Recetas:", err);
        setError(err.message);
      });
  }, []);

  // Cargar boards propios y compartidos
  useEffect(() => {

    if (!user) {
      // console.log("DEBUG | No hay usuario logueado.");
      return;
    }

    // console.log("DEBUG | Usuario actual listo:", user);

    getBoardsByUser(user._id)
      .then(allBoards => {
        // console.log("DEBUG | Boards del backend:", allBoards);

        const ownBoards = allBoards.filter(
          board => board.owner.toString() === user._id.toString()
        );

        const sharedBoards = allBoards.filter(
          board => board.owner.toString() !== user._id.toString()
        );

        setOwnBoards(ownBoards);
        setSharedBoards(sharedBoards);

      })
      .catch(err => {
        console.error("ERROR | Boards:", err);
        setError("Error al cargar los menús");
      });
  }, [user]);

  return (
    <div className="text-center">
      <h1 className="mb-4 text-indigo fw-bold mt-5">Bienvenido a Cocina Facil</h1>

      {/* Sección Recetas */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-indigo">Recetas</h2>
        <Link to="/recipes/new" className="btn btn-primary">+ Agregar receta</Link>
      </div>

      <div className="row justify-content-center mb-5">
        {recipes
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // más recientes primero
          .slice(0, 6) // mostrar solo las primeras 6
          .map(recipe => (
            <div key={recipe._id} className="col-md-4 mb-4">
              <RecipeCard recipe={recipe} />
            </div>
          ))
        }
        <Link to="/recipes" className="btn btn-outline-secondary me-2">Ver todas las recetas</Link>
      </div>
     {/*Sección Menús */}
<section className="mb-5">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2 className="text-indigo">Menús</h2>
    <Link to="/boards/create" className="btn btn-primary">+ Nuevo Menú</Link>
  </div>

  <div className="p-3 rounded shadow-sm" style={{ backgroundColor: "#f4f5f7" }}>
    
    {/* Mis menús */}
    <div className="mb-4">
      <h3 className="text-indigo mb-3">¡Mis menús!</h3>
      {ownBoards.length === 0 ? (
        <p className="text-muted">No tenés menús propios.</p>
      ) : (
        <div className="row justify-content-center g-3">
          {ownBoards.map(board => (
            <BoardCard key={board._id} board={board} />
          ))}
        </div>
      )}
    </div>

    {/* Compartidos conmigo */}
    <div>
      <h3 className="text-indigo mb-3">Compartidos conmigo</h3>
      {sharedBoards.length === 0 ? (
        <p className="text-muted">No tenés menús compartidos.</p>
      ) : (
        <div className="row justify-content-center g-3">
          {sharedBoards.map(board => (
            <BoardCard key={board._id} board={board} />
          ))}
        </div>
      )}
    </div>

  </div>
</section>
    </div>
  );
}
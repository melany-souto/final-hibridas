// import { Link } from "react-router-dom";
// import RecipeCard from "../components/RecipeCard.jsx";
// import BoardCard from "../components/BoardCard.jsx";
// import { useState, useEffect } from "react";
// import { getRecipes } from "../services/recipe.service.js"
// // import { getBoards } from "../services/board.service.js"
// import { getBoardsByUser } from "../services/board.service.js";
// import { useUser } from "../contexts/SessionContext.jsx";


// export default function Home() {
//   const { user, loading } = useUser();

//   if (loading) return <p>Cargando usuario...</p>;
//   if (!user) return <p>No hay usuario logueado.</p>;
//   const [recipes, setRecipes] = useState([]);
//   const [boards, setBoards] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getRecipes()
//       .then(res => setRecipes(res))
//       .catch(err => setError(err.message));
//   }, []);

//   useEffect(() => {
//     console.log("Usuario actual:", user);
//     if (!user) return;

//     getBoardsByUser(user._id)
//       .then((allBoards) => {

//         console.log("Boards que llegan del backend:", allBoards); // 🔍

//         const visibleBoards = allBoards.filter(menu => {
//           const ownerId = menu.owner.toString();
//           const sharedIds = (menu.sharedWith || []).map(id => id.toString());
//           return ownerId === user._id || sharedIds.includes(user._id);
//         });


//         console.log("Boards visibles después del filtro:", visibleBoards); // 🔍
//         setBoards(visibleBoards);
//       })
//       .catch(err => {
//         console.error(err);
//         setError("Error al cargar los menús");
//       });
//   }, [user]);

//   return (
//     <div className="text-center">
//       <h1 className="mb-4 text-indigo fw-bold">Bienvenido a Recetas Facil</h1>

//       {/* Sección Recetas */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="text-indigo">Recetas</h2>
//         <Link to="/recipes/new" className="btn btn-primary">
//           + Agregar receta
//         </Link>
//       </div>
//       <div className="row justify-content-center mb-5">
//         {recipes.map(recipe => (
//           <div key={recipe._id} className="col-md-4 mb-4">
//             <Link to={`/recipes/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//               <RecipeCard recipe={recipe} />
//             </Link>
//           </div>
//         ))}
//         <Link to="/recipes" className="btn btn-outline-secondary me-2">
//           Ver todas las recetas
//         </Link>
//       </div>

//       {/* Sección Tableros */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="text-indigo">¡Mis menús!</h2>
//         <Link to="/boards/new" className="btn btn-primary">
//           + Nuevo Menú
//         </Link>
//       </div>
//       <div className="row justify-content-center">
//         {boards.length === 0 && !error ? (
//           <p className="text-muted text-center">No tenés menús propios ni compartidos.</p>
//         ) : (
//           boards.map(board => <BoardCard key={board._id} board={board} />)
//         )}
//       </div>
//     </div>
//   );
// }


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
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState("");

  // Debug inicial de user y loading
  useEffect(() => {
    console.log("DEBUG | Home.jsx - user:", user);
  }, [user]);

  // Cargar recetas
  useEffect(() => {
    getRecipes()
      .then(res => {
        console.log("DEBUG | Recetas cargadas:", res);
        setRecipes(res);
      })
      .catch(err => {
        console.error("ERROR | Recetas:", err);
        setError(err.message);
      });
  }, []);

  // Cargar boards propios y compartidos
  useEffect(() => {
    // if (loading) {
    //   console.log("DEBUG | Esperando a que user termine de cargar...");
    //   return;
    // }

    if (!user) {
      console.log("DEBUG | No hay usuario logueado.");
      return;
    }

    console.log("DEBUG | Usuario actual listo:", user);

    getBoardsByUser(user._id)
      .then(allBoards => {
        console.log("DEBUG | Boards del backend:", allBoards);

        const visibleBoards = allBoards.filter(board => {
          const ownerId = board.owner.toString();
          const sharedIds = (board.sharedWith || []).map(id => id.toString());

          console.log(`DEBUG | Board '${board.title}' -> owner: ${ownerId}, sharedWith: ${sharedIds}`);

          return ownerId === user._id || sharedIds.includes(user._id);
        });

        console.log("DEBUG | Boards visibles después del filtro:", visibleBoards);
        setBoards(visibleBoards);
      })
      .catch(err => {
        console.error("ERROR | Boards:", err);
        setError("Error al cargar los menús");
      });
  }, [user]);

  // Renderizado
  // if (loading) return <p>Cargando usuario...</p>;
  if (!user) return <p>No hay usuario logueado.</p>;

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

      {/* Sección Tableros */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-indigo">¡Mis menús!</h2>
        <Link to="/boards/create" className="btn btn-primary">+ Nuevo Menú</Link>
      </div>
      <div className="row justify-content-center">
        {boards.length === 0 && !error
          ? <p className="text-muted text-center">No tenés menús propios ni compartidos.</p>
          : boards.map(board => <BoardCard key={board._id} board={board} />)
        }
      </div>
    </div>
  );
}
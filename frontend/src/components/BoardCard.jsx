// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// export default function BoardCard({ board }) {
//   const navigate = useNavigate();
  
//   return (
//     <div className="col-6 col-md-4 mb-4">
//       <div className="card shadow-sm h-100">
//         <div className="card-body text-center">
//           <h5 className="card-title">{board.title}</h5>
//           {board.description && <p className="card-text">{board.description}</p>}
//           <p className="text-muted">{board.date}</p>
//           <Link to={`/boards/${board._id}`} className="btn btn-outline-primary btn-sm">
//             Ver tablero
//           </Link>
//           {/* <button className="btn btn-outline-secondary btn-sm mt-2">
//   Compartir
// </button> */}
//   <button onClick={() => navigate(`/boards/${board._id}/share`)}  className="btn btn-outline-secondary btn-sm mt-2">
//     Compartir menú
//   </button>
//   {/* <div>
//     <p>Menú compartido con </p>
//   </div> */}

// {/* {board.owner === user.id && (
//   <button onClick={() => navigate(`/boards/${board._id}/share`)}>
//     Compartir tablero
//   </button>
// )} */}
//         </div>
//       </div>
//     </div>
//   );
// }





import { Link } from "react-router-dom";

export default function BoardCard({ board }) {
  return (
    <div className="col-6 col-md-4 mb-4">
      <Link
        to={`/boards/${board._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card shadow-sm h-100">
          <div className="card-body text-center">
            <h5 className="card-title">{board.title}</h5>
            {board.description && (
              <p className="card-text">{board.description}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
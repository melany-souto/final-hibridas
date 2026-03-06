import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sharedBoard } from "../../services/board.service";

export default function SharedBoard() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleShare = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("El email es obligatorio");
      return;
    }

    sharedBoard(boardId, email, token)
      .then((response) => {
        setMessage("Menú compartido correctamente");
        setError(false);
        setEmail("");
      })
      .catch((err) => {
        console.error("Error al compartir:", err);
        setMessage("Error al compartir el menú");
        setError(true);
      });
  };

  return (
    <>
     <h2 className="p-4">Compartir menú</h2>
      <form onSubmit={handleShare} className="d-flex flex-column gap-2">
        <input
          type="email"
          placeholder="Email del usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />

       <button type="submit" className="btn btn-sm btn-primary align-self-start">
  Compartir menú
</button>
      </form>

      {/* Mostrar mensaje */}
      {
        message && (
          <div
            className={`mt-3 p-2 rounded ${error ? "bg-danger text-white" : "bg-success text-white"
              }`}
          >
            {message}
          </div>
        )
      }
    </>
  );
}
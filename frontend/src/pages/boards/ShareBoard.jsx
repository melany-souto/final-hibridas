import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sharedBoard } from "../../services/board.service";

export default function SharedBoard() {
  const token = JSON.parse(localStorage.getItem("token")); 
  const navigate = useNavigate();
  const { boardId } = useParams();

  const [email, setEmail] = useState("");

  const handleShare = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("El email es obligatorio");
      return;
    }

    console.log("📌 Enviando:", boardId, email, token); 
  //   try {
  //     await sharedBoard(boardId, email, token );
  //     alert("Menú compartido correctamente");
  //     setEmail("");
  //   } catch (error) {
  //     alert("Error al compartir");
  //   }
  // };


      try {
      const response = await sharedBoard(boardId, email, token);
      console.log("✅ Respuesta del backend:", response);
      alert("Menú compartido correctamente");
      setEmail("");
      // navigate(`/boards/${boardId}`); // opcional: volver al board
    } catch (error) {
      console.error("💥 Error al compartir:", error);
      alert("Error al compartir el menú");
    }
  };

  return (
    <form onSubmit={handleShare}>
      <input
        type="email"
        placeholder="Email del usuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">Compartir menú</button>
    </form>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../services/board.service";

export default function CreateBoard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    await createBoard({ title });
    navigate("/boards");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título del menú"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Crear menú</button>
    </form>
  );
}
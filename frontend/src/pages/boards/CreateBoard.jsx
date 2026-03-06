import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../services/board.service";

export default function CreateBoard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    await createBoard({ title });
    navigate("/boards");
  };

  return (
    <>
      <h2 className="p-4">Nuevo Menú</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <input
          type="text"
          placeholder="Título del menú"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Crear menú
        </button>
        {error && <div className="text-danger">{error}</div>}
      </form>
    </>
  );
}
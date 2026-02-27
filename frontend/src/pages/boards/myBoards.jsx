import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardCard from "../../components/BoardCard";
import { useUser } from "../../contexts/SessionContext";
import { getBoardsByUser } from "../../services/board.service";

export default function MyBoards() {
    const user = useUser();
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        getBoardsByUser(user._id)
            .then(setBoards)
            .catch(err => {
                console.error(err);
                setError("eerror al cargar los menús");
            });
    }, [user]);

    return (
    <div className="container mt-4">
        <h2>Mis menús</h2>

        {error && <p className="text-danger">{error}</p>}

        {boards.length === 0 && !error && (
            <div className="text-center mt-4">
                <p className="text-muted">
                    Aún no tienes ningún menú.
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/boards/create")}
                >
                    Crear el primero
                </button>
            </div>
        )}

        <div className="row">
            {boards.map(board => (
                <BoardCard key={board._id} board={board} />
            ))}
        </div>
    </div>
);
}
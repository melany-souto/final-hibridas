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
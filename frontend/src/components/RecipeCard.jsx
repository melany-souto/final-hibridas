import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card shadow-sm h-100 mx-auto" style={{  maxWidth: "400px", 
          width: "100%" }}> 
        <img
          src={recipe.image || "https://picsum.photos/400/300"}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{recipe.title}</h5>
        </div>
      </div>
    </Link>
  );
}
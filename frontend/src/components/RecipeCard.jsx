export default function RecipeCard({ recipe }) {
  return (

      <div className="card shadow-sm h-100">
        <img
          src={recipe.image || "https://picsum.photos/400/300" }
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{recipe.title}</h5>
        </div>
      </div>
  );
}
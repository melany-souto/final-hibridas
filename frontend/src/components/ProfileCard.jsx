export default function ProfileCard({ user }) {
  if (!user) return <p>Cargando...</p>;

  return (
    <div className="container mt-5">

      <div
        className="p-4 rounded shadow-sm"
        style={{ backgroundColor: "#f4f5f7", maxWidth: "600px", margin: "0 auto" }}
      >

        <div className="card shadow-sm p-4 text-center">

          <div className="position-relative d-inline-block">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="rounded-circle"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "4px solid #0d6efd"
                }}
              />
            ) : (
              <div
                className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                style={{ width: "120px", height: "120px", fontSize: "40px" }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h3 className="mt-3 mb-1">{user.name}</h3>
          <p className="text-muted mb-2">{user.email}</p>

          <p className="text-secondary">
            {user.bio ||
              "Bienvenido a mi perfil! Estoy usando Cocina Facil para compartir mis recetas favoritas."}
          </p>

        </div>

      </div>

    </div>
  );
}
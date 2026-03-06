import { Link, NavLink } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { user } = useSession();
  const [ search, setSearch ] = useState("");
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Cocina facil</Link>

      <form
        className="d-flex ms-auto me-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!search.trim()) return;
          navigate(`/recipes?title=${search}`);
        }}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Buscar
        </button>
      </form>

      <ul className="navbar-nav">
        {user ? (
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.name || user.email}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <NavLink className="dropdown-item" to={`/MyProfile`}>
                  Mi perfil
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to={`/MyRecipes`}>
                  Mis recetas
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to={`/boards`}>
                  Mis menús
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/logout">
                  Cerrar Sesión
                </NavLink>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">Registrarse</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
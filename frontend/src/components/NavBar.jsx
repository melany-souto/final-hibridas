import { Link, NavLink } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

export default function NavBar() {
  const { user } = useSession();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Cocina facil</Link>

      <form className="d-flex ms-auto me-3" role="search">
        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
        <button className="btn btn-outline-success" type="submit">Buscar</button>
      </form>

      <ul className="navbar-nav">
        {user ? (
          // Si hay usuario, dropdown con perfil y logout
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.username || user.email}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <NavLink className="dropdown-item" to={`/recipes`}>
                  Mis recetas
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to={`/boards`}>
                  Mis tableros
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
          // Si NO hay usuario, mostrar iniciar sesión | registrarse
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
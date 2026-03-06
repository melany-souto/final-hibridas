import NavBar from "./NavBar";
import MenuBar from "./MenuBar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <header>
        <NavBar />
        <MenuBar />
      </header>

      <div className="container">
        <Outlet />
      </div>

      <footer className="text-center py-3 bg-light mb-3">
        © 2025 cocinaFacil
      </footer>
    </>
  );
}
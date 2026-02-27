import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../contexts/SessionContext";

export default function Logout() {
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, []);

  return null;
}
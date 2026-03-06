import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [messages, setMessages] = useState([]); 
  
  const validateForm = () => {
    const errors = [];
    if (!email) errors.push("El email es requerido");
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("El email debe ser válido");
    if (!password) errors.push("La contraseña es obligatoria");
    if (password.length > 0 && password.length < 8) errors.push("La contraseña debe tener al menos 8 caracteres");
    if (!passwordConfirm) errors.push("Debes confirmar la contraseña");
    if (password && passwordConfirm && password !== passwordConfirm)
      errors.push("Las contraseñas no coinciden");

    setMessages(errors.map((e) => ({ text: e, type: "error" })));
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = { email, password, username: email };

    registerUser(payload)
      .then(() => {
        setMessages([{ text: "Registro exitoso. Redirigiendo a login...", type: "success" }]);
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch((err) => {
        // errores backend
        if (err.response?.data?.errors) {
          const backendErrors = err.response.data.errors.map((e) => ({
            text: e.message || e,
            type: "error",
          }));
          setMessages(backendErrors);
        } else {
          setMessages([{ text: err.response?.data?.message || "Error en el registro", type: "error" }]);
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-4 text-center text-indigo">Registro</h3>
              <div>
                <span>
                  ¿Ya tienes cuenta?{" "}
                  <Link className="login text-indigo" to="/login">
                    Inicia sesión
                  </Link>
                </span>
              </div>

              {/* Mostrar mensajes */}
              {messages.length > 0 && (
                <div className="mt-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`alert ${
                        m.type === "error" ? "alert-danger" : "alert-success"
                      } alert-dismissible fade show`}
                      role="alert"
                    >
                      {m.text}
                      <button type="button" className="btn-close" onClick={() => setMessages([])}></button>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMessages([]);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setMessages([]);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordConfirm}
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                      setMessages([]);
                    }}
                  />
                </div>

                <button className="btn btnMisto fs-5 w-100" type="submit">
                  Registrarme
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
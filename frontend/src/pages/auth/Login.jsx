import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../contexts/SessionContext";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Email y contraseña son obligatorios");
            return;
        }

        loginUser({ email, password })
            .then(user => {
                login(user);
                setError("");
                navigate("/");
            })
            .catch(err => {
                console.log("Error capturado:", err);

                if (err.status === 400) {
                    setError(err.details?.join(", ") || err.message); // errores de validación de Yup
                } else if (err.status === 401) {
                    setError("Email o contraseña incorrectos");
                } else {
                    setError(err.message || "Error del servidor");
                }
            });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">

                            <h3 className="mb-4 text-center text-indigo">Iniciar sesión</h3>

                            <div>
                                <span>¿Aún no tienes cuenta?{" "}
                                    <Link className="register text-indigo" to="/register">Registrate</Link>
                                </span>
                            </div>

                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError("");
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button className="btn btnMisto fs-5 w-100" type="submit">
                                    Entrar
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

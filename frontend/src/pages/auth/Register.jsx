import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [error, setError] = useState(""); // error general
    const [errors, setErrors] = useState([]); // errores del backend Y locales

    const validateForm = () => {
        const formErrors = [];
        if (!email) formErrors.push("El email es requerido");
        if (!email.includes("@")) formErrors.push("El email debe ser válido");
        if (!password) formErrors.push("La contraseña es obligatoria");
        if (password.length < 8) formErrors.push("La contraseña debe tener al menos 8 caracteres");
        if (!passwordConfirm) formErrors.push("Debes confirmar la contraseña");
        if (password !== passwordConfirm) formErrors.push("Las contraseñas no coinciden");
        setErrors(formErrors);

        return formErrors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            email,
            password,
            username: email
        };

        registerUser(payload)
            .then(() => {
                setErrors([]);
                setError("");
                navigate('/login');
            })
            .catch(err => {
                {/* Errores del backend (Yup) */ }
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors);
                    setError("");
                } else {
                    setError(err.response?.data?.message || "Error en el registro");
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
                                <span>¿Ya tienes cuenta?{" "}
                                    <Link className="login text-indigo" to="/login">Inicia sesión</Link>
                                </span>
                            </div>

                            {/* Error general */}
                            {error && (
                                <div className="alert alert-danger mt-3">
                                    {error}
                                </div>
                            )}

                            {/* Errores del backend / locales */}
                            {errors.length > 0 && (
                                <div className="alert alert-danger mt-3">
                                    <ul className="mb-0">
                                        {errors.map((e, i) => (
                                            <li key={i}>{e}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-3">

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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

                                <div className="mb-3">
                                    <label className="form-label">Confirmar contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
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

import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/users.service";
import { useUser } from "../../contexts/SessionContext";
import ProfileCard from "../../components/ProfileCard"


export default function MyProfile() {
    const user = useUser();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        setError("");

        getUserById(user._id)
            .then((data) => {
                console.log("USER DATA::", data);
                setProfile(data);
            })
            .catch(() => {
                setError("No se pudo cargar el perfil");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user]);

    return (
        <>
            <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-secondary ms-auto d-block mt-4"
                title="Volver"
            >
                Volver
            </button>

            {loading && <p className="text-center mt-4">Cargando usuario...</p>}
            {error && <p className="alert alert-danger mb-3">{error}</p>}
            {!loading && !error && !profile && <p className="text-center mt-4">Perfil no encontrado</p>}

            {!loading && !error && profile && (
                <>
                    <div className="h2 m-3">Mi Perfil</div>
                    <ProfileCard user={profile} />
                    <NavLink className="btn btn-outline-secondary btn-sm mt-2" to={`/MyProfile/edit`}>
                        Editar perfil
                    </NavLink>
                </>
            )}
        </>
    );
}

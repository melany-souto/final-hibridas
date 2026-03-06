import { useEffect, useState } from "react";
import { getUserById } from "../../services/users.service";
import { useNavigate, useParams } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard";

export default function UserProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getUserById(id)
            .then((data) => {
                // console.log("USER DATA A VER:", data);
                setProfile(data);
            })
            .catch((err) => {
                // console.error("No se pudo cargar el perfil");
                setError("No se pudo cargar el perfil");
            })
    }, [id])
    return (
        <>
            <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-secondary ms-auto d-block mt-4"
            >
                Volver
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="h2 m-3">Perfil de {profile?.name || "Usuario"}</div>
            <ProfileCard user={profile} />
        </>
    )
}
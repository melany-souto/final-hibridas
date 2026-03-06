import { useEffect, useState } from "react";
import { getUserById } from "../../services/users.service";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard";

export default function UserProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getUserById(id)
            .then((data) => {
                console.log("USER DATA A VER:", data);
                setProfile(data);
            })
            .catch((err) => {
                console.error("No se pudo cargar el perfil");
                setError("No se pudo cargar el perfil");
            })
    }, [id])
    return (
        <>
            <div className="h2 m-3">Perfil de {profile?.name || "Usuario"}</div>
            <ProfileCard user={profile} />
        </>
    )
}
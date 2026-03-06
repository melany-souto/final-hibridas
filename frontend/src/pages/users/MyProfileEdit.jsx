import { useState } from "react";
import { useUser } from "../../contexts/SessionContext";
import EditProfileForm from "../../components/EditProfileForm";
import { editPartialUser } from "../../services/users.service";
import { useNavigate } from "react-router-dom";

export default function MyProfileEdit() {
  const user = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (updatedData) => {
    editPartialUser(updatedData, user._id)
      .then(() => {
        navigate("/MyProfile"); 
      })
      .catch((err) => {
        console.error("Error al guardar perfil:", err);
        setError("No se pudo actualizar el perfil");
      });
  };

  return (
    <>
      <div className="h2 m-3">Editar perfil</div>

      {error && <div className="alert alert-danger">{error}</div>}

      <EditProfileForm initialData={user} onSubmit={handleSubmit} />
    </>
  );
}
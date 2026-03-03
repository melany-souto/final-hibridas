import { useEffect, useState } from "react";
import { useUser } from "../../contexts/SessionContext";
import EditProfileForm from "../../components/EditProfileForm";
import { editPartialUser } from "../../services/users.service";


export default function MyProfileEdit(){
    const user = useUser();
 const handleSubmit = (updatedData) => {
    console.log("Datos a guardar:", updatedData);

    editPartialUser(updatedData, user._id)
      .then((result) => {
        console.log("Resultado de la actualización:", result);
        alert("Perfil actualizado!");
      })
      .catch((err) => {
        console.error("Error al guardar perfil:", err);
        alert("No se pudo actualizar el perfil");
      });
    };

    return(
        <>
        <div className="h2 m-3">Editar perfil</div>
        <EditProfileForm initialData={user} onSubmit={handleSubmit} />
        </>
    )
}

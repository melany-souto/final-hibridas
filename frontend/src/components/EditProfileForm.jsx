import { useState, useEffect } from "react";
export default function EditProfileForm({ initialData, onSubmit, saving }) {
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        avatar: null
    })

    useEffect(() => {
        setFormData(initialData || {});
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    const selectAvatar = (avatar) => {
        setFormData((prev) => ({
            ...prev,
            avatar: avatar
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...formData };

        if (!data.avatar) {
            delete data.avatar;
        }

        onSubmit(data);
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <input name="name" value={formData.name || ""} onChange={handleChange} className="form-control mb-2" placeholder="Apodo" />

                <div className="mb-3">
                    <p>Elegir avatar:</p>

                    <div className="d-flex gap-3">

                        <img
                            src="/img/avatars/girl1.png"
                            width="80"
                            style={{ cursor: "pointer", border: formData.avatar === "/img/avatars/girl1.png" ? "3px solid blue" : "none" }}
                            onClick={() => selectAvatar("/img/avatars/girl1.png")}
                        />

                        <img
                            src="/img/avatars/girl2.png"
                            width="80"
                            style={{ cursor: "pointer", border: formData.avatar === "/img/avatars/girl2.png" ? "3px solid blue" : "none" }}
                            onClick={() => selectAvatar("/img/avatars/girl2.png")}
                        />

                        <img
                            src="/img/avatars/boy1.png"
                            width="80"
                            style={{ cursor: "pointer", border: formData.avatar === "/img/avatars/boy1.png" ? "3px solid blue" : "none" }}
                            onClick={() => selectAvatar("/img/avatars/boy1.png")}
                        />

                        <img
                            src="/img/avatars/boy2.png"
                            width="80"
                            style={{ cursor: "pointer", border: formData.avatar === "/img/avatars/boy2.png" ? "3px solid blue" : "none" }}
                            onClick={() => selectAvatar("/img/avatars/boy2.png")}
                        />

                    </div>
                </div>

                <textarea name="bio" value={formData.bio || ""} onChange={handleChange} className="form-control mb-2" placeholder="Biografía" />

                <button className="btn btn-primary" disabled={saving}>
                    {saving ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </div>
    );
}

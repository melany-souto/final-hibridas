import { useState, useEffect } from "react";
export default function EditProfileForm({ initialData, onSubmit, saving }) {
    const [formData, setFormData] = useState(initialData || {})

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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <input name="name" value={formData.name} onChange={handleChange} className="form-control mb-2" placeholder="Apodo" />

                <input name="avatar" value={formData.avatar} onChange={handleChange} className="form-control mb-2" placeholder="Imagen" />

                <textarea name="bio" value={formData.bio} onChange={handleChange} className="form-control mb-2" placeholder="Biografía" />

                <button className="btn btn-primary" disabled={saving}>
                    {saving ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </div>
    );
}

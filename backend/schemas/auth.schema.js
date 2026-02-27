import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup
        .string()
        .required("El mail es obligatorio")
        .email("El mail debe ser válido"),

    password: yup
        .string()
        .min(8, "Debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria")
});

export const registerSchema = yup.object({
    email: yup
        .string()
        .required("El mail es obligatorio")
        .email("El mail debe ser válido"),

    password: yup
        .string()
        .min(8, "Debe tener al menos 8 caracteres")
        .max(20, "No puede superar los 20 caracteres")
        .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .required("La contraseña es obligatoria")
});
import * as yup from "yup";

export const createBoardSchema = yup.object({
    title: yup
        .string()
        .trim()
        .min(3, "El título debe tener al menos 3 caracteres")
        .required("El título es obligatorio"),

    state: yup
        .string()
        .oneOf(["active", "archived"])
        .default("active")
        
});

export const updateBoardSchema = yup.object({
    title: yup
        .string()
        .trim()
        .min(3, "El título debe tener al menos 3 caracteres")
        .optional(),

    state: yup
        .string()
        .oneOf(["active", "archived"])
        .optional(),
    
    recipes: yup
        .array()
        .of(yup.string())
        .optional()
});
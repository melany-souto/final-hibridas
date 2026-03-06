import * as yup from "yup"

export const createRecipeSchema = yup.object({
    title: yup.string()
        .required("El nombre es obligatorio")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre no puede exceder los 50 caracteres"),

    description: yup.string().notRequired(),

    categoryId: yup.string()
        .required("La categoría es obligatoria"),

    image: yup.string()
        .url("La imagen debe ser una URL válida")
        .notRequired(),

    ingredients: yup.array()
        .of(yup.string().required("Cada ingrediente debe ser un texto"))
        .min(1, "Debe haber al menos un ingrediente")
        .required("Los ingredientes son obligatorios"),

    cook_time: yup.number()
        .typeError("El tiempo de cocción debe ser un número")
        .positive("El tiempo de cocción debe ser positivo")
        .integer("El tiempo de cocción debe ser un número entero")
        .required("El tiempo de cocción es obligatorio"),

    difficulty: yup.mixed()
        .oneOf(["easy", "medium", "hard"], "Dificultad no válida")
        .required("La dificultad es obligatoria"),

    method: yup.string()
        .required("El método es obligatorio"),

    video_link: yup.string()
        .url("El enlace de video debe ser una URL válida")
        .notRequired(),

});

export const updateRecipeSchema = yup.object({
    title: yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre no puede exceder los 50 caracteres"),

    description: yup.string().notRequired(),

    categoryId: yup.string().notRequired(),

    image: yup.string()
        .url("La imagen debe ser una URL válida")
        .notRequired(),

    ingredients: yup.array()
        .of(yup.string())
        .notRequired(),

    cook_time: yup.number()
        .typeError("El tiempo de cocción debe ser un número")
        .positive("El tiempo de cocción debe ser positivo")
        .integer("El tiempo de cocción debe ser un número entero")
        .notRequired(),

    difficulty: yup.mixed()
        .oneOf(["easy", "medium", "hard"], "Dificultad no válida")
        .notRequired(),

    method: yup.string().notRequired(),

    video_link: yup.string()
        .url("El enlace de video debe ser una URL válida")
        .notRequired(),
});
import express from "express";
import cors from "cors";

import RecipesApiRoute from "./api/routes/recipes.api.route.js"
import UsersApiRoute from "./api/routes/users.api.route.js"
import AuthApiRoute from "./api/routes/auth.api.route.js"
import CategoriesApiRoute from "./api/routes/categories.api.route.js"
import BoardsApiRoute from "./api/routes/boards.api.route.js"

const app=express();

app.use(cors({
  origin: "http://localhost:5173" // el origen del frontend
}));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/recipes", RecipesApiRoute)
app.use("/api/users", UsersApiRoute)
app.use("/api/auth", AuthApiRoute)
app.use("/api/categories", CategoriesApiRoute)
app.use("/api/boards", BoardsApiRoute)

app.listen(3333, ()=>{
    console.log("Backend listo")
})
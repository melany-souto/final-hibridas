import express from "express"
import * as controller from "../controllers/users.api.controller.js"

const route = express.Router()

route.get("/", controller.getAllUsers)
route.get("/:id", controller.getUserById)

route.post("/", controller.createUser)
route.delete("/:id", controller.deleteUserLog)
// route.put("/:id", controller.replaceUser)
route.patch("/:id", controller.updateUser)
// route.get("/:idUser/favoritos", controller.getFavs)
// route.post("/:idUser/favoritos", controller.addToFav)





export default route

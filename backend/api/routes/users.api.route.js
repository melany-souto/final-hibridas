import express from "express"
import * as controller from "../controllers/users.api.controller.js"

const route = express.Router()

route.get("/", controller.getAllUsers)
route.get("/:id", controller.getUserById)
route.post("/", controller.createUser)
route.delete("/:id", controller.deleteUserLog)
route.patch("/:id", controller.updateUser)

export default route

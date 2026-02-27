import express from "express"
import * as controller from "../controllers/auth.api.controller.js"
import { validate } from "../../middleware/schema/validate.js"
import { registerSchema, loginSchema } from "../../schemas/auth.schema.js"


const route = express.Router()

route.post("/register", validate(registerSchema), controller.registerUser)
route.post("/login", validate(loginSchema), controller.loginUser)

export default route

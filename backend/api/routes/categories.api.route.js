import express from "express";
import { getCategories } from "../controllers/categories.api.controller.js";

const route = express.Router();

route.get("/", getCategories);

export default route;
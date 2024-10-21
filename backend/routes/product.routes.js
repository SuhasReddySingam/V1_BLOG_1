import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/blog.controller.js";
const router = express.Router();

router.get("/view", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;
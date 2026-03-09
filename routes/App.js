import express from "express";
import { getApps, createApp, updateApp, deleteApp } from "../controller/AppController.js";

const router = express.Router();

router.get("/", getApps);
router.post("/", createApp);
router.put("/:id", updateApp);
router.delete("/:id", deleteApp);

export default router;
// routes/trackingRoutes.js

import express from "express";
import { track, report } from "../controllers/trackingController.js";

const router = express.Router();

router.post("/track", track);
router.get("/report", report);

export default router;
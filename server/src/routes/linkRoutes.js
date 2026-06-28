import express from "express";
import { nanoid } from "nanoid";

import Link from "../model/Link.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/shorten",authMiddleware, async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "url is required",
            });
        }

        const shortCode = nanoid(6);

        const link = await Link.create({
            userId:req.userId,
            originalUrl: url,
            shortCode,
        });
        const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

        res.status(200).json({
            success: true,
            shortUrl,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


export default router;
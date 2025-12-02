import { ReadingLog } from "../models/readingLog.model.js";

export const logReading = async (req, res) => {
    try {
        const { title, category, readTime, articleId } = req.body;
        const userId = req.userId;

        const log = new ReadingLog({
            userId,
            title,
            category,
            readTime,
            articleId
        });

        await log.save();

        res.status(201).json({
            success: true,
            message: "Reading logged successfully",
            log
        });
    } catch (error) {
        console.error("Error logging reading:", error);
        res.status(500).json({ success: false, message: error.message });
        console.error("Error fetching reading history:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

import Tracking from "../models/Tracking.js";
import classify from "../utils/classify.js";

// ✅ TRACK FUNCTION
export const track = async (req, res) => {
    try {
        const { url, duration } = req.body;

        let domain = "";

        try {
            domain = new URL(url).hostname;
        } catch {
            domain = url;
        }

        domain = domain.replace("www.", "").toLowerCase();

        const category = classify(domain);

        console.log("DEBUG:", domain, "→", category);

        await Tracking.create({
            url,
            domain,
            duration,
            category
        });

        res.json({ message: "Saved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ REPORT FUNCTION (THIS WAS MISSING EXPORT)
export const report = async (req, res) => {
    try {
        const data = await Tracking.find();

        let productive = 0;
        let unproductive = 0;

        data.forEach(d => {
            if (d.category === "productive") productive += d.duration;
            if (d.category === "unproductive") unproductive += d.duration;
        });

        res.json({
            total: data,
            summary: { productive, unproductive }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
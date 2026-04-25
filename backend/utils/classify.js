export default function classify(domain) {
    if (!domain) return "neutral";

    // PRODUCTIVE
    if (
        domain.includes("github") ||
        domain.includes("leetcode") ||
        domain.includes("stackoverflow")
    ) {
        return "productive";
    }

    // UNPRODUCTIVE
    if (
        domain.includes("youtube") ||
        domain.includes("instagram") ||
        domain.includes("facebook") ||
        domain.includes("twitter") ||
        domain.includes("netflix")
    ) {
        return "unproductive";
    }

    return "neutral";
}
// services/analytics.js

export function generateSummary(data) {
    let productive = 0;
    let unproductive = 0;
    let neutral = 0;

    data.forEach(item => {
        if (item.category === "productive") productive += item.duration;
        else if (item.category === "unproductive") unproductive += item.duration;
        else neutral += item.duration;
    });

    return { productive, unproductive, neutral };
}


// 🗓️ Weekly Report (last 7 days)
export function getWeeklyReport(data) {
    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    return data.filter(item => new Date(item.date) >= lastWeek);
}


// 📈 Group by domain (for dashboard table)
export function groupByDomain(data) {
    const map = {};

    data.forEach(item => {
        if (!map[item.domain]) {
            map[item.domain] = {
                domain: item.domain,
                duration: 0,
                category: item.category
            };
        }

        map[item.domain].duration += item.duration;
    });

    return Object.values(map);
}
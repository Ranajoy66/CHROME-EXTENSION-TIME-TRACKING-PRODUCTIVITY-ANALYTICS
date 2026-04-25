// src/Dashboard.jsx
import { useEffect, useState } from "react";
import { getReport } from "./api";
import Chart from "./components/Chart";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState({
        productive: 0,
        unproductive: 0,
    });

    useEffect(() => {
        getReport()
            .then((res) => {
                setData(res.data.total);
                setSummary(res.data.summary);
            })
            .catch((err) => console.log(err));
    }, []);

    const formatTime = (ms) => {
        const seconds = Math.floor(ms / 1000);

        if (seconds < 60) return `${seconds} sec`;

        const minutes = Math.floor(seconds / 60);
        return `${minutes} min`;
    };
    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>📊 Productivity Dashboard</h1>

            {/* SUMMARY CARDS */}
            <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                <div style={cardStyle}>
                    <h3>Productive</h3>
                    <p>{formatTime(summary.productive)}</p>
                </div>

                <div style={cardStyle}>
                    <h3>Unproductive</h3>
                    <p>{formatTime(summary.unproductive)}</p>
                </div>
            </div>

            {/* CHART */}
            <h2 style={{ textAlign: "center", marginTop: "30px" }}>
                Productivity Breakdown
            </h2>
            <Chart
                productive={summary.productive}
                unproductive={summary.unproductive}
            />

            {/* TABLE */}
            <h2 style={{ marginTop: "30px" }}>Website Usage</h2>

            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th>Website</th>
                        <th>Time Spent</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{item.domain}</td>
                            <td>{formatTime(item.duration)}</td>
                            <td
                                style={{
                                    color:
                                        item.category === "productive"
                                            ? "green"
                                            : item.category === "unproductive"
                                                ? "red"
                                                : "gray",
                                }}
                            >
                                {item.category}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// 🎨 STYLES
const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "150px",
};

const tableStyle = {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
};
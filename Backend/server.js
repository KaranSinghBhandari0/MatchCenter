require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on Port " + PORT);
});

app.get("/", (req, res) => {
    res.send("This is root");
});

// All matches (SCHEDULED, IN_PLAY, FINISHED) within ±3 days
app.get("/api/football/matches", async (req, res) => {
    try {
        const today = new Date();

        // 3 days before
        const dateFrom = new Date(today);
        dateFrom.setDate(today.getDate() - 3);
        const dateFromStr = dateFrom.toISOString().split("T")[0];

        // 3 days after
        const dateTo = new Date(today);
        dateTo.setDate(today.getDate() + 3);
        const dateToStr = dateTo.toISOString().split("T")[0];

        const response = await axios.get(
            `https://api.football-data.org/v4/matches?dateFrom=${dateFromStr}&dateTo=${dateToStr}`,
            {
                headers: {
                    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching all matches:", error.message);
        res.status(500).json({ error: "Failed to fetch all matches" });
    }
});

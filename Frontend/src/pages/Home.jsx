import React, { useEffect, useState } from "react";
import axios from "axios";
import MatchCard from "../components/MatchCard";
import FilterButtons from "../components/FilterButtons";
import { Loader2 } from "lucide-react";

export default function Home() {
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [filter, setFilter] = useState("Upcoming");
    const [loading, setLoading] = useState(true);

    const fetchMatches = async () => {
        try {
            setLoading(true);
            const res = await axios.get("https://match-center-backend.vercel.app/api/football/matches");
            setMatches(res.data.matches);
            applyFilter(res.data.matches, filter);
        } catch (error) {
            console.error("Error fetching matches:", error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilter = (allMatches, status) => {
        let filtered = [];
        if (status === "Upcoming") {
            filtered = allMatches.filter((m) => m.status === "TIMED");
        } else if (status === "Live") {
            filtered = allMatches.filter((m) => m.status === "IN_PLAY");
        } else if (status === "Finished") {
            filtered = allMatches.filter((m) => m.status === "FINISHED");
        }
        setFilteredMatches(filtered);
    };

    const formatDate = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    useEffect(() => {
        applyFilter(matches, filter);
    }, [filter]);

    return (
        <div className="min-h-screen">
            <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">⚽ Football Matches</h1>
            <FilterButtons filter={filter} setFilter={setFilter} />

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                </div>
            ) : filteredMatches.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No matches found for {filter}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMatches.map((match) => (
                        <MatchCard key={match.id} match={match} formatDate={formatDate} />
                    ))}
                </div>
            )}
        </div>
    );
}

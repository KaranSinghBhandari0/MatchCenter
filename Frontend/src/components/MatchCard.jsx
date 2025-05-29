import React from "react";

export default function MatchCard({ match, formatDate }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
            <div className="bg-blue-50 p-4 flex justify-between items-center border-b">
                <div className="flex items-center gap-2">
                    <img src={match.area.flag} alt="flag" className="w-6 h-4 object-cover rounded-sm" />
                    <p className="text-sm text-gray-700">{match.area.name}</p>
                </div>
                <div className="flex items-center gap-2">
                    <img src={match.competition.emblem} alt="competition" className="w-6 h-6" />
                    <p className="text-sm font-semibold text-blue-800">{match.competition.name}</p>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <img src={match.homeTeam.crest} alt="home crest" className="w-8 h-8" />
                        <p className="font-medium">{match.homeTeam.name}</p>
                    </div>
                    <span className="text-gray-500">vs</span>
                    <div className="flex items-center gap-2">
                        <img src={match.awayTeam.crest} alt="away crest" className="w-8 h-8" />
                        <p className="font-medium">{match.awayTeam.name}</p>
                    </div>
                </div>

                <div className="text-center mb-3">
                    <p className="text-gray-600 text-sm">{match.stage?.replace("_", " ")} - {match.group || "N/A"}</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">Matchday: {match.matchday || "-"}</p>
                    <p className="text-sm text-gray-500 mt-2">{formatDate(match.utcDate)}</p>
                </div>

                <div className="text-center mt-4">
                    {match.status === "FINISHED" ? (
                        <p className="text-xl font-bold text-green-600">
                            {match.score.fullTime.home} - {match.score.fullTime.away}
                        </p>
                    ) : (
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                match.status === "IN_PLAY"
                                    ? "bg-green-100 text-green-700"
                                    : match.status === "SCHEDULED" || match.status === "TIMED"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {match.status.replace("_", " ")}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

import React from "react";

export default function FilterButtons({ filter, setFilter }) {
    const statuses = ["Upcoming", "Live", "Finished"];

    return (
        <div className="flex justify-center gap-4 flex-wrap mb-10">
            {statuses.map((status) => (
                <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold shadow transition-all ${
                        filter === status
                            ? "bg-blue-600 text-white"
                            : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>
    );
}

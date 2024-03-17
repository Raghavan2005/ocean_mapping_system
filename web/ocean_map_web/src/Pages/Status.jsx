import React from 'react';

export default function Status({ text }) {
    let colorClass = 'bg-red-600';

    if (text === "Live") {
        colorClass = 'bg-green-600';
    }
    if(text === "Fetching"){
        colorClass = 'bg-yellow-600';
    }
    if(text === "Offline"){
        colorClass = 'bg-red-600';
    }
    if(text === "Reconnecting"){
        colorClass = 'bg-blue-600';
    }
    return (
        <div>
            <span className={`pb-1 font-bold text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded ${colorClass} `}>
             {text+'...'}
             
            </span>
        </div>
    );
}

import React from 'react';

export default function ActivityCard({ activity: { name, description, status, weblink } }) {
  return (
    <div className="bg-eee0c5 rounded-2xl border border-gray-400 shadow-md hover:shadow-lg transition p-4 flex">
      <div className="w-32 h-full bg-[oklch(0.36_0_0)]"></div>
      <div className="flex-1 flex flex-col justify-between ml-4">
        <div>
          <div className="flex space-x-2 mb-2">
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-lg">Domain Name</span>
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-lg">Technology Name</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800">{name || 'No Title Available'}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description || 'No description provided.'}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <a
            href={weblink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-orange-600"
          >
            →
          </a>
          <span
            className={`text-xs px-3 py-1 rounded-lg ${
              status === 'Completed' ? 'bg-yellow-200 text-yellow-800' :
              status === 'Ongoing' ? 'bg-teal-200 text-teal-800' :
              'bg-blue-200 text-blue-800'
            }`}
          >
            {status || 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ActivityGrid({ activities }) {
  if (!activities || !activities.length) return <p>No activities available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

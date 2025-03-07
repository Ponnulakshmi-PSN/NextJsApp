"use client";
import { useState, useEffect } from 'react';
import ActivityCard from '@/components/ActivityCard';
import Pagination from '@/components/Pagination';
import FilterBar from '@/components/FilterBar';

const API_URL = '/api/proxy'; // Using the Next.js API route proxy

export default function ProposalPage() {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [noRecords, setNoRecords] = useState(false);
  const itemsPerPage = 6;

  const fetchActivities = async ({ status = '', search = '' } = {}) => {
    try {
      const res = await fetch(
        `${API_URL}?page=${currentPage}&status=${encodeURIComponent(status)}&search=${encodeURIComponent(search)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data, "Filtered data");

      const filteredActivities = data.data.filter(activity => {
        const searchWords = search.toLowerCase().split(/\s+/).filter(Boolean);
        const name = activity.name?.toLowerCase() || '';
        const description = activity.description?.toLowerCase() || '';

        const matchesSearch = searchWords.every(word =>
          name.includes(word) || description.includes(word)
        );

        const matchesStatus = status === '' || activity.status.toLowerCase() === status.toLowerCase();

        return matchesSearch && matchesStatus;
      });

      setActivities(filteredActivities);
      setTotalPages(filteredActivities.length ? Math.ceil(filteredActivities.length / itemsPerPage) : 1);
      setNoRecords(filteredActivities.length === 0);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      setNoRecords(true);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, activities.length);
  const visibleActivities = activities.slice(startIndex, endIndex); 

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-left mb-8 text-orange-500">Proposals</h1>
      <FilterBar 
        setActivities={setActivities} 
        setCurrentPage={setCurrentPage} 
        fetchActivities={fetchActivities} 
      />

      {noRecords ? (
        <div className="text-center text-gray-500 text-lg">No records found</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          {visibleActivities.length > 0 && (
            <Pagination
              page={currentPage}
              setPage={setCurrentPage}
              totalPages={Math.ceil(activities.length / itemsPerPage)}
              hideNext={endIndex >= activities.length}
            />
          )}
        </>
      )}
    </div>
  );
}

import { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function FilterBar({ setActivities, setCurrentPage, fetchActivities }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setShowDropdown(false);
    setCurrentPage(1);
    fetchActivities({ status, search: searchQuery });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchActivities({ status: selectedStatus, search: searchQuery });
  };

  return (
    <div className="flex items-center justify-between mb-8 bg-white filterstyle p-4 rounded-lg shadow-md border border-[#a0a0a0]">
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder="Search for Institutes eg. IIT Madras"
          className="w-[500px] border border-[#a0a0a0] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      <div className="flex space-x-4">
        <div className="relative">
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center border border-[#a0a0a0]"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedStatus || 'Sort By'}
            <FaFilter className="ml-2" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#a0a0a0] rounded-lg shadow-lg z-50">
              {['Upcoming', 'Ongoing', 'Completed'].map((status) => (
                <div
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition border border-[#a0a0a0]"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

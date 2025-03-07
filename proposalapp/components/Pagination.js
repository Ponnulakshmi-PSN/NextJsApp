export default function Pagination({ page, setPage, totalPages }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`px-3 py-1 rounded-full ${
            page === pageNumber ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}

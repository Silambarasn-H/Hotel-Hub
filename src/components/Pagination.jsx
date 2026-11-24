function Pagination({
  
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onPageChange
}) {
  return (
    <div className="pagination">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          type="button"
          key={index}
          className={currentPage === index + 1 ? "active-page" : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

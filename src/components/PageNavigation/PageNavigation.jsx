import React from "react";

export default function PageNavigation({
  currentPage,
  handlePageChange,
  totalPage,
}) {

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const displayRange = 2; // Number of page numbers to display before and after the current page

    for (let i = 1; i <= totalPage; i++) {
      // Display the current page and a range around it
      if (
        i === 1 ||
        i === totalPage ||
        (i >= currentPage - displayRange && i <= currentPage + displayRange)
      ) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(i)}
            >
              <span>{i}</span>
            </button>
          </li>
        );
      } else if (
        // Display ellipsis for pages outside the range
        (i === currentPage - displayRange - 1 || i === currentPage + displayRange + 1)
      ) {
        pageNumbers.push(
          <li key={i} className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="col-12">
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span>Previous</span>
              </button>
            </li>
            {/* Render page numbers */}
           {renderPageNumbers()}

            <li
              className={`page-item ${
                currentPage === totalPage ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
              >
                <span>Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

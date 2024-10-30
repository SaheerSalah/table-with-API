import React from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

interface PaginationProps {
  rowsPerPage: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
const Pagination = ({ rowsPerPage, currentPage, totalPages, onPageChange }: PaginationProps) => {
    const displayPageCount = 3; // عدد الصفحات التي تريد عرضها
    const halfDisplayCount = Math.floor(displayPageCount / 2);

    // تحديد بداية ونهاية الصفحات المعروضة
    let startPage = Math.max(currentPage - halfDisplayCount, 1);
    let endPage = Math.min(startPage + displayPageCount - 1, totalPages);
  
    if (endPage - startPage < displayPageCount - 1) {
      // startPage = Math.max(endPage - displayPageCount + 1, 1);
      startPage = Math.max(endPage - (displayPageCount - 1), 1);
    }
  
  return (
    <div className="flex gap-2 mt-4 justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
          style={{ fontWeight: currentPage === startPage + index ? 'bold' : 'normal' }}
        >
          {startPage + index}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>

    // <div className="flex justify-center items-center mt-4">
    //   <button
    //     className="px-3 py-2 bg-gray-200 text-gray-600  hover:bg-gray-300 duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
    //     // onClick={GoPrevious}
    //     // disabled={currentPage == 1}
    //   >
    //     <GrPrevious />
    //   </button>
    //   {/* disabled={page > totalPages} */}

    //   {/* <div>
    //     {[num, num + 1, num + 2].map((page: number) => (
    //       <button
    //         className={`px-3 py-1 border border-gray-300  mx-1 ${
    //           currentPage === page ? "bg-gray-200" : ""
    //         }`}
    //         onClick={() => handleCurrentPage(page)}
    //       >
    //         {page}
    //       </button>
    //     ))}
    //   </div> */}

    //   <button
    //     className={`px-3 py-2 bg-gray-200 text-gray-600  hover:bg-gray-300 duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed`}
    //     // disabled={currentPage === totalPages}
    //     // onClick={GoNext}
    //   >
    //     <GrNext />{" "}
    //   </button>
    // </div>
  );
};

export default Pagination;

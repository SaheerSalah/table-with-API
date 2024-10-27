import React from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";



interface PaginationProps {
    rowsPerPage : number;

}
const Pagination = ({rowsPerPage}:PaginationProps) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="px-3 py-2 bg-gray-200 text-gray-600  hover:bg-gray-300 duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        // onClick={GoPrevious}
        // disabled={currentPage == 1}
      >
        <GrPrevious />
      </button>
      {/* disabled={page > totalPages} */}

      {/* <div>
        {[num, num + 1, num + 2].map((page: number) => (
          <button
            className={`px-3 py-1 border border-gray-300  mx-1 ${
              currentPage === page ? "bg-gray-200" : ""
            }`}
            onClick={() => handleCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div> */}

      <button
        className={`px-3 py-2 bg-gray-200 text-gray-600  hover:bg-gray-300 duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed`}
        // disabled={currentPage === totalPages}
        // onClick={GoNext}
      >
        <GrNext />{" "}
      </button>
    </div>
  );
};

export default Pagination;

import React from "react";

function PaginationControls(props) {
  const { onNext, onPrev, currPage, lastPage } = props;
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <button
        disabled={currPage === 0}
        className="disabled:opacity-60  text-white bg-red-600 p-2 rounded-sm w-20 mx-1"
        onClick={onPrev}
      >
        Prev
      </button>
      <button
        disabled={lastPage <= currPage}
        className="disabled:opacity-60 text-white bg-red-600 p-2 rounded-sm w-20 mx-1"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;

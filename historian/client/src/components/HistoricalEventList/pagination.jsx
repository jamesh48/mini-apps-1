import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';


export default ({offsetCallback, numberOfPages}) => {
  const handlePageClick = (data) => {
    const offset = Math.ceil(data.selected * 10);
    offsetCallback(offset)
  }

  return numberOfPages ? (
    <ReactPaginate
      previousLabel={'previous'}
      previousClassName={'page-no-previous'}
      nextClassName={'page-no-next'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'breaker'}
      pageCount={numberOfPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      pageClassName={'pageNo'}
      pageLinkClassName={'page-no-a'}
      activeLinkClassName={'active-page-no-a'}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />) : null;
}
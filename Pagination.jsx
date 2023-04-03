import React from "react";
import propTypes from "prop-types";
//import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const PagesCount = Math.ceil(itemsCount / pageSize);
  console.log(currentPage);
  //const pages = _.range(1, PagesCount + 1); //stating page
  const pages = []; //without using library
  for (let i = 1; i <= PagesCount; i++) {
    pages.push(i);
  }

  Pagination.propTypes = {
    itemsCount: propTypes.number,
    pageSize: propTypes.number,
    onPageChange: propTypes.func,
    currentPage: propTypes.number,
  };
  return (
    <>
      <nav>
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              key={index}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => onPageChange(page)}
                href="/#"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;

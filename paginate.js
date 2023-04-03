import _ from "lodash";

import React from "react";

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  //function chain--functional programming

  //return _(items).slice(startIndex).take(pageSize).value();//third party library

  return items.slice(startIndex, startIndex + pageSize);
};

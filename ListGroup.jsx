import React from "react";

const ListGroup = (props) => {
  const { items, valueProperty, textProperty, onItemSelect, selectedItemGen } =
    props;
  return (
    <ul className="list-group">
      {items.map((item, _id) => (
        <li
          className={
            item === selectedItemGen
              ? "active list-group-item"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;

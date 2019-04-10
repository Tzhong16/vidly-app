import React from 'react';

const ListGroup = ({
  items,
  valueProperty,
  textProperty,
  onItemSelect,
  selectItem
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            selectItem === item ? 'list-group-item active' : 'list-group-item'
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;

import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem, copy }) => {
  return (
    <div className="token-list">
      {items.map((item) => {
        const { id, title, company } = item;
        return (
          <article className="token-item" key={id}>
            <p className="company">{company}</p>
            <p className="title" onClick={() => copy(id)}>
              {title}
            </p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaPen />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;

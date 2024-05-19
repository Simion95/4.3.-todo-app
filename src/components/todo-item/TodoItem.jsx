import React from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = props => {
  const handleCheckboxChange = (checked) => {
    props.onStatusChange(props.id, checked);
  };

  const handleDeleteClick = () => {
    props.onDelete(props.id);
  };

  return (
    <div className={`todo-item ${props.completed && "todo-completed"}`}>
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox
            checked={!!props.completed}
            onChange={handleCheckboxChange}
          />

          <h4>{props.title}</h4>
        </div>
        <div>
          <i className="fa fa-pencil" onClick={props.onEdit} aria-hidden="true"></i>
          <i className="fa fa-trash" onClick={handleDeleteClick} aria-hidden="true"></i>
        </div>
      </div>

      <div className="separator"></div>

      <p>{props.description}</p>
    </div>
  );
};

export default TodoItem;

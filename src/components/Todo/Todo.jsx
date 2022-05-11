import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import TextArea from "../TextArea";
import Icon from "../Icon";
import Tag from "../Tag";
import Button from "../Button";
import { format } from "date-fns";
import { supabase } from "../../config/apiClient";
import { AppContext } from "../../App";
const Todo = ({ todo }) => {
  const {
    handleRemoveTodo,
    flag,
    removeCompleteFromIncomplete,
    toasts,
    setToasts,
  } = useContext(AppContext);
  const [newName, setNewName] = useState(todo.name);
  const [showEdit, setShowEdit] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const editToggle = (e) => {
    setShowEdit(!showEdit);
  };
  const edit = (e) => {
    setNewName(e.target.value);
  };
  // Delete task
  const deletetodo = (id) => {
    setShowLoading(true);

    handleRemoveTodo(id);
  };
  // on Complete

  const completeHandler = async (e) => {
    setShowLoading(true);
    const dateValue = new Date(Date.now());
    try {
      const { data } = await supabase
        .from("ReactTodo")
        .update({ completed_on: dateValue })
        .match({ id: todo.id });

      todo.completed_on = data[0]["completed_on"];
      if (flag === "incomplete") removeCompleteFromIncomplete(todo.id);
      let newToast = {
        id: uuidv4(),
        type: "success",
        message: "Task Complted",
      };
      if (showEdit) editToggle();
      setToasts([...toasts, newToast]);
    } catch (error) {
      let newToast = {
        id: uuidv4(),
        type: "error",
        message: error,
      };
      setToasts([...toasts, newToast]);
    }

    if (flag !== "incomplete") setShowLoading(false);
  };

  const editValue = async (e) => {
    // setNewName(newName.trim().replace(/\s+/g, " "));
    if (
      newName.trim().replace(/\s+/g, " ").length > 2 &&
      todo.name !== newName.trim().replace(/\s+/g, " ")
    ) {
      setShowLoading(true);
      // eslint-disable-next-line
      const { data, error } = await supabase
        .from("ReactTodo")
        .update({ name: newName.trim().replace(/\s+/g, " ") })
        .match({ id: todo.id });
      if (error === null) {
        todo.name = newName.trim().replace(/\s+/g, " ");
        setNewName(newName.trim().replace(/\s+/g, " "));
      }
      editToggle();
      setShowLoading(false);
      let newToast = {
        id: uuidv4(),
        type: error ? "error" : "success",
        message: error ? error : "Task Edited",
      };
      setToasts([...toasts, newToast]);
    } else {
      setNewName(newName.trim().replace(/\s+/g, " "));
      editToggle();
    }
  };

  return (
    <div id="todo" className="todo">
      <div>
        {showEdit === true ? (
          <TextArea
            id="editName"
            className={`textarea-editName ${
              (todo.isLoading || showLoading) && "blur"
            }`}
            value={newName}
            onChange={edit}
            readOnly={showLoading}
            autoFocus
            onFocus={(e) => {
              var val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                editValue(todo.id);
              }
            }}
          />
        ) : (
          <div>
            <Tag
              id="showName"
              className={`${todo.completed_on && "tag-completed"} ${
                (todo.isLoading || showLoading) && "blur"
              }`}
            >
              {todo.name}
            </Tag>
          </div>
        )}
        {!showEdit && (
          <div
            className={`todo-createdAt ${
              (todo.isLoading || showLoading) && "blur"
            }`}
          >
            Created At: {format(new Date(todo.created_at), "dd.MM.yy")}
          </div>
        )}
      </div>
      <div
        className={`boxedButtonCompletedOn ${
          (todo.isLoading || showLoading) && "blur"
        }`}
      >
        <div className="allBoxedButon">
          {showEdit && (
            <Button className="saveButton " onClick={() => editValue(todo.id)}>
              Save
            </Button>
          )}
          {!todo.completed_on && (
            <Button
              className="boxedButton "
              onClick={() => {
                completeHandler(todo.id);
              }}
            >
              <Icon src="Tick" />
            </Button>
          )}
          {!todo.completed_on && !showEdit && (
            <Button onClick={editToggle} className="boxedButton ">
              <Icon src="Edit" />
            </Button>
          )}
          <Button className="boxedButton" onClick={() => deletetodo(todo.id)}>
            <Icon src="Delete" />
          </Button>
        </div>
        {todo.completed_on && (
          <Tag className="tag-completedOn">
            Completed in{" "}
            {Math.ceil(
              Math.abs(
                Date.parse(todo.completed_on) - Date.parse(todo.created_at),
              ) /
                (1000 * 60 * 60 * 24),
            )}{" "}
            days
          </Tag>
        )}
      </div>

      {(todo.isLoading || showLoading) && (
        <Icon className="spinning rotateDiv" src="Spin" />
      )}
    </div>
  );
};

export default Todo;

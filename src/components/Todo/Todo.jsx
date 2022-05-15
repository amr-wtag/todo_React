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
    search,
  } = useContext(AppContext);
  const [newName, setNewName] = useState(todo.name);
  const [showEdit, setShowEdit] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  let completedDays = Math.ceil(
    Math.abs(Date.parse(todo.completed_on) - Date.parse(todo.created_at)) /
      (1000 * 60 * 60 * 24),
  );
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

    const { data, error } = await supabase
      .from("ReactTodo")
      .update({ completed_on: dateValue })
      .match({ id: todo.id });

    if (error === null) {
      todo.completed_on = data[0]["completed_on"];
      if (flag === "incomplete") removeCompleteFromIncomplete(todo.id);
      if (showEdit) editToggle();
    }
    let newToast = {
      id: uuidv4(),
      type: error ? "error" : "success",
      message: error ? error.message : "Task Complted",
    };

    setToasts([...toasts, newToast]);

    if (flag !== "incomplete") setShowLoading(false);
  };

  const editValue = async (e) => {
    if (
      newName
        .trim()
        .replace(/\s+/g, " ")
        .replace(/(<([^>]+)>)/gi, "").length > 2 &&
      todo.name !==
        newName
          .trim()
          .replace(/\s+/g, " ")
          .replace(/(<([^>]+)>)/gi, "")
    ) {
      setShowLoading(true);
      // eslint-disable-next-line
      const { data, error } = await supabase
        .from("ReactTodo")
        .update({
          name: newName
            .trim()
            .replace(/\s+/g, " ")
            .replace(/(<([^>]+)>)/gi, ""),
        })
        .match({ id: todo.id });

      if (error === null) {
        todo.name = newName
          .trim()
          .replace(/\s+/g, " ")
          .replace(/(<([^>]+)>)/gi, "");
        setNewName(
          newName
            .trim()
            .replace(/\s+/g, " ")
            .replace(/(<([^>]+)>)/gi, ""),
        );
        if (!data[0].name.includes(search)) {
          removeCompleteFromIncomplete(todo.id);
        }
        editToggle();
      }
      setShowLoading(false);
      let newToast = {
        id: uuidv4(),
        type: error ? "error" : "success",
        message: error ? error.message : "Task Edited",
      };
      setToasts([...toasts, newToast]);
    } else {
      setNewName(todo.name);
      editToggle();
    }
  };

  return (
    <div id="todo" className="todo">
      <div>
        {showEdit === true ? (
          <TextArea
            id="editName"
            className={`textarea-editName ${showLoading && "blur"}`}
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
                showLoading && "blur"
              }`}
            >
              {todo.name}
            </Tag>
          </div>
        )}
        {!showEdit && (
          <div className={`todo-createdAt ${showLoading && "blur"}`}>
            Created At: {format(new Date(todo.created_at), "dd.MM.yy")}
          </div>
        )}
      </div>
      <div className={`boxedButtonCompletedOn ${showLoading && "blur"}`}>
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
        {todo.completed_on &&
          (completedDays > 1 ? (
            <Tag className="tag-completedOn">
              Completed in {completedDays} days
            </Tag>
          ) : (
            <Tag className="tag-completedOn">Completed in a day</Tag>
          ))}
      </div>

      {showLoading && <Icon className="spinning rotateDiv" src="Spin" />}
    </div>
  );
};

export default Todo;

import classNames from "classnames";
import { format, formatDistance } from "date-fns";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { completeTask, updateTask } from "../../config/ApiCall";
import Button from "../Button";
import Icon from "../Icon";
import Tag from "../Tag";
import TextArea from "../TextArea";
const Todo = ({ todo }) => {
  const {
    handleRemoveTodo,
    flag,
    removeCompleteFromIncomplete,
    addToast,
    search,
    sanitize,
  } = useContext(AppContext);
  const [newName, setNewName] = useState(todo.name);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const completedDays =
    todo.completed_on &&
    formatDistance(Date.parse(todo.completed_on), Date.parse(todo.created_at));

  const editToggle = () => {
    setIsEdit((prev) => !prev);
  };
  const edit = (event) => {
    setNewName(event.target.value);
  };
  // Delete task
  const deleteTodo = (id) => {
    setIsLoading(true);
    handleRemoveTodo(id);
  };
  // on Complete

  const completeHandler = async () => {
    setIsLoading(true);
    const dateValue = new Date(Date.now());

    const { data, error } = await completeTask(dateValue, todo.id);

    if (error === null) {
      todo.completed_on = data[0]["completed_on"];
      if (flag === "incomplete") removeCompleteFromIncomplete(todo.id);
      if (isEdit) editToggle();
    }
    addToast(error, error ? "something Wrong" : "Task Completed");

    if (flag !== "incomplete") setIsLoading(false);
  };

  const editValue = async () => {
    try {
      const updatedName = await sanitize(newName);

      if (updatedName.length > 2 && todo.name !== updatedName) {
        setIsLoading(true);
        // eslint-disable-next-line
        const { data, error } = await updateTask(updatedName, todo.id);

        if (error === null) {
          todo.name = updatedName;
          setNewName(updatedName);
          if (!data[0].name.includes(search)) {
            removeCompleteFromIncomplete(todo.id);
          }
          editToggle();
        }
        setIsLoading(false);
        addToast(error, error ? "something Wrong" : "Task Edited");
      } else {
        setNewName(todo.name);
        editToggle();
      }
    } catch (e) {}
  };

  return (
    <div id="todo" className="todo">
      <div>
        {isEdit ? (
          <TextArea
            id="editName"
            className={classNames("textarea__edit-name", { blur: isLoading })}
            value={newName}
            onChange={edit}
            readOnly={isLoading}
            autoFocus
            onFocus={(event) => {
              var val = event.target.value;
              event.target.value = "";
              event.target.value = val;
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                editValue();
              }
            }}
          />
        ) : (
          <div>
            <Tag
              className={classNames("tag__name", {
                "tag--completed": todo.completed_on,
                blur: isLoading,
              })}
            >
              {todo.name}
            </Tag>
          </div>
        )}
        {!isEdit && (
          <Tag className={classNames("todo__created-at", { blur: isLoading })}>
            Created At: {format(new Date(todo.created_at), "dd.MM.yy")}
          </Tag>
        )}
      </div>
      <div
        className={classNames("btn__boxed-button__completed-on", {
          blur: isLoading,
        })}
      >
        <div className="btn__all__boxed-button">
          {isEdit && (
            <Button className="btn btn__save-button" onClick={editValue}>
              Save
            </Button>
          )}
          {!todo.completed_on && (
            <Button
              id="complete"
              className="btn btn__boxed-button"
              onClick={() => {
                completeHandler(todo.id);
              }}
            >
              <Icon src="Tick" />
            </Button>
          )}
          {!todo.completed_on && !isEdit && (
            <Button
              id="edit"
              onClick={editToggle}
              className="btn btn__boxed-button"
            >
              <Icon src="Edit" />
            </Button>
          )}
          <Button
            id="delete"
            className="btn btn__boxed-button"
            onClick={() => deleteTodo(todo.id)}
          >
            <Icon src="Delete" />
          </Button>
        </div>
        {completedDays &&
          (completedDays.includes("minute") ? (
            <Tag className="tag__completed-on">Completed in a day</Tag>
          ) : (
            <Tag className="tag__completed-on">
              Completed in {completedDays}
            </Tag>
          ))}
      </div>

      {isLoading && (
        <Icon className="logo__spinning logo__rotate-div" src="Spin" />
      )}
    </div>
  );
};

export default Todo;

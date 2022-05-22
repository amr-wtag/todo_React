//absolute imports
import classNames from "classnames";
import { format, formatDistance } from "date-fns";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//relative imports
import { AppContext } from "../../App";
import { supabase } from "../../config/apiClient";
import Button from "../Button";
import Icon from "../Icon";
import Tag from "../Tag";
import TextArea from "../TextArea";
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
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const completedDays =
    todo.completed_on &&
    formatDistance(Date.parse(todo.completed_on), Date.parse(todo.created_at));

  const editToggle = (eevent) => {
    setIsEdit((prev) => !prev);
  };
  const edit = (event) => {
    setNewName(event.target.value);
  };
  // Delete task
  const deletetodo = (id) => {
    setIsLoading(true);

    handleRemoveTodo(id);
  };
  // on Complete

  const completeHandler = async () => {
    setIsLoading(true);
    const dateValue = new Date(Date.now());

    const { data, error } = await supabase
      .from("ReactTodo")
      .update({ completed_on: dateValue })
      .match({ id: todo.id });

    if (error === null) {
      todo.completed_on = data[0]["completed_on"];
      if (flag === "incomplete") removeCompleteFromIncomplete(todo.id);
      if (isEdit) editToggle();
    }
    let newToast = {
      id: uuidv4(),
      type: error ? "error" : "success",
      message: error ? error.message : "Task Complted",
    };

    setToasts([...toasts, newToast]);

    if (flag !== "incomplete") setIsLoading(false);
  };

  const editValue = async () => {
    const updatedName = newName
      .trim()
      .replace(/\s+/g, " ")
      .replace(/(<([^>]+)>)/gi, "");
    if (updatedName.length > 2 && todo.name !== updatedName) {
      setIsLoading(true);
      // eslint-disable-next-line
      const { data, error } = await supabase
        .from("ReactTodo")
        .update({
          name: updatedName,
        })
        .match({ id: todo.id });

      if (error === null) {
        todo.name = updatedName;
        setNewName(updatedName);
        if (!data[0].name.includes(search)) {
          removeCompleteFromIncomplete(todo.id);
        }
        editToggle();
      }
      setIsLoading(false);
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
        {isEdit ? (
          <TextArea
            id="editName"
            className={classNames("textarea-editName", { blur: isLoading })}
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
                editValue(todo.id);
              }
            }}
          />
        ) : (
          <div>
            <Tag
              id="showName"
              className={classNames({
                "tag-completed": todo.completed_on,
                blur: isLoading,
              })}
            >
              {todo.name}
            </Tag>
          </div>
        )}
        {!isEdit && (
          <Tag className={classNames("todo-createdAt", { blur: isLoading })}>
            Created At: {format(new Date(todo.created_at), "dd.MM.yy")}
          </Tag>
        )}
      </div>
      <div
        className={classNames("boxedButtonCompletedOn", { blur: isLoading })}
      >
        <div className="allBoxedButon">
          {isEdit && (
            <Button className="saveButton" onClick={() => editValue(todo.id)}>
              Save
            </Button>
          )}
          {!todo.completed_on && (
            <Button
              id="complete"
              className="boxedButton"
              onClick={() => {
                completeHandler(todo.id);
              }}
            >
              <Icon src="Tick" />
            </Button>
          )}
          {!todo.completed_on && !isEdit && (
            <Button id="edit" onClick={editToggle} className="boxedButton">
              <Icon src="Edit" />
            </Button>
          )}
          <Button
            id="delete"
            className="boxedButton"
            onClick={() => deletetodo(todo.id)}
          >
            <Icon src="Delete" />
          </Button>
        </div>
        {completedDays &&
          (completedDays.includes("minute") ? (
            <Tag className="tag-completedOn">Completed in a day</Tag>
          ) : (
            <Tag className="tag-completedOn">Completed in {completedDays}</Tag>
          ))}
      </div>

      {isLoading && <Icon className="spinning rotateDiv" src="Spin" />}
    </div>
  );
};

export default Todo;

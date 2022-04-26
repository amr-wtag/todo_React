import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TextArea } from "./components/TextArea";
import { Icon } from "./components/Icon";
import { Tag } from "./components/Tag";
import { Button } from "./components/Button";
import { format } from "date-fns";
const Todo = ({
  todo,
  onDelete,
  completeHandler,
  editToggle,
  setTodos,
  allTodos,
  toasts,
  setToasts,
}) => {
  const [newName, setNewName] = useState(todo.name);
  const edit = (e) => {
    setNewName(e.target.value);
  };
  const [showLoading, setShowLoading] = useState(false);
  const editValue = (id) => {
    setNewName(newName.trim().replace(/\s+/g, " "));
    const index = allTodos.findIndex((todo) => todo.id === id);
    if (
      newName.trim().replace(/\s+/g, " ").length > 2 &&
      allTodos[index].name !== newName.trim().replace(/\s+/g, " ")
    ) {
      setShowLoading(true);
      setTimeout(() => {
        let tempTodos = [...allTodos];
        tempTodos[index].name = newName;
        setTodos(tempTodos);

        editToggle(id);
        setShowLoading(false);
        let newToast = {
          id: uuidv4(),
          type: "success",
          message: "Task Edited",
        };
        let allToast = [...toasts];
        allToast.push(newToast);
        setToasts(allToast);
      }, 1000);
    } else {
      setNewName(allTodos[index].name);
      editToggle(id);
    }
  };
  return (
    <div id="todo" className="todo">
      <div>
        {todo.isEdit === true ? (
          <TextArea
            id="editName"
            className={`editName ${(todo.isLoading || showLoading) && "blur"}`}
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
              className={`${todo.completed_on && "completed"} ${
                (todo.isLoading || showLoading) && "blur"
              }`}
            >
              {todo.name}
            </Tag>
          </div>
        )}
        {!todo.isEdit && (
          <div
            className={`createdAt ${(todo.isLoading || showLoading) && "blur"}`}
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
          {todo.isEdit && (
            <Button
              className="saveButton btn"
              onClick={() => editValue(todo.id)}
            >
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
          {!todo.completed_on && !todo.isEdit && (
            <Button
              onClick={() => editToggle(todo.id)}
              className="boxedButton "
            >
              <Icon src="Edit" />
            </Button>
          )}
          <Button className="boxedButton" onClick={() => onDelete(todo.id)}>
            <Icon src="Delete" />
          </Button>
        </div>
        {todo.completed_on && (
          <Tag className="completedOn">
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

import React, { useState } from "react";
import Todo from "./Todo";
import { TextArea } from "./components/TextArea";
import { Icon } from "./components/Icon";
import { Button } from "./components/Button";
const todos = ({
  todos,
  onDelete,
  completeHandler,
  show,
  togglehandler,
  addhandler,
  task,
  showSpinner,
  showBigSpinner,
  flagHandler,
  todoLength,
  editToggle,
  setTodos,
  toasts,
  setToasts,
}) => {
  // eslint-disable-next-line
  const [top, setTop] = useState(12);
  // eslint-disable-next-line
  const [showFullSpinner, setShowFullSpinner] = useState(false);
  const moreValue = (e) => {
    setShowFullSpinner(true);
    setTimeout(() => {
      setTop(top + 12);

      setShowFullSpinner(false);
    }, 300);
  };
  const showless = (e) => {
    setTop(12);
  };
  return (
    <div>
      <div className={`${(showBigSpinner || showFullSpinner) && "blur"}`}>
        <div className="addTask">
          <h1 className="addTaskH1">Add Tasks</h1>
        </div>

        <div className="headerClass">
          <Button className="create btn" onClick={togglehandler}>
            <Icon src="Plus" />
            Create
          </Button>
          <div className={`topButtonAll ${todoLength === 0 && "blurButton"}`}>
            <Button
              className={`topButton btn `}
              disabled={todoLength === 0}
              onClick={(e) => {
                flagHandler("all");
              }}
            >
              All
            </Button>
            <Button
              className={`topButton btn `}
              disabled={todoLength === 0}
              onClick={(e) => {
                flagHandler("incomplete");
              }}
            >
              Incomplete
            </Button>
            <Button
              className={`topButton btn `}
              disabled={todoLength === 0}
              onClick={(e) => {
                flagHandler("complete");
              }}
            >
              Complete
            </Button>
          </div>
        </div>
        <div className="todos">
          {show && (
            <div id="todo" className="todo">
              <div>
                <TextArea
                  className={`editName ${showSpinner && "blur"}`}
                  placeholder="Add new task"
                  autoFocus
                  onChange={(e) => task(e.target.value)}
                  readOnly={showSpinner}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addhandler(e);
                    }
                  }}
                  onFocus={function (e) {
                    var val = e.target.value;
                    e.target.value = "";
                    e.target.value = val;
                  }}
                />
              </div>
              <div className="addDel">
                <Button
                  className={`saveButton btn ${showSpinner && "blur"}`}
                  onClick={addhandler}
                >
                  Add Task
                </Button>
                <Button className="boxedButton" onClick={togglehandler}>
                  <Icon src="Delete" />
                </Button>
              </div>

              {showSpinner && (
                <div>
                  <Icon className="spinning rotateDiv" src="Spin" />
                </div>
              )}
            </div>
          )}
          {todos.slice(0, top).map((todo) => (
            <Todo
              allTodos={todos}
              todo={todo}
              key={todo.id}
              onDelete={onDelete}
              completeHandler={completeHandler}
              editToggle={editToggle}
              setTodos={setTodos}
              toasts={toasts}
              setToasts={setToasts}
            />
          ))}
        </div>

        {!showFullSpinner && (
          <div className="bottomButton">
            {todos.length <= 12 ? null : top <= todos.length ? (
              <div className="loadmoreOver">
                <Button className="loadMoreBtnContainer" onClick={moreValue}>
                  Load More
                </Button>
              </div>
            ) : (
              <div className="loadmoreOver">
                <Button className="loadMoreBtnContainer" onClick={showless}>
                  Show Less
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        {showFullSpinner && <Icon className="spinning rotateFull" src="Spin" />}
      </div>
    </div>
  );
};

export default todos;

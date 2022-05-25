/* eslint-disable react-hooks/rules-of-hooks */

import classNames from "classnames";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { AddTask } from "../../config/ApiCall";
import Button from "../Button";
import Icon from "../Icon";
import TextArea from "../TextArea";
import Todo from "../Todo";
const Todos = () => {
  const {
    todos,
    flagHandler,
    flag,
    dataCount,
    AddToast,
    search,
    setDataCount,
    setIsEmpty,
    Sanitize,
    isLoading,
    setIsLoading,
  } = useContext(AppContext);

  const [top, setTop] = useState(12);
  const [showSpinner, setShowSpinner] = useState(false);
  const [taskvalue, setTaskvalue] = useState("");
  const [show, setShow] = useState(false);

  //add task value
  const task = (event) => {
    setTaskvalue(event);
  };
  const toggleHandler = (event) => {
    event.preventDefault();
    setTaskvalue("");
    setShow(!show);
    setIsEmpty(show);
  };
  const addhandler = async () => {
    const updatedName = await Sanitize(taskvalue);
    if (updatedName.length < 3) {
      AddToast("error", "Task length must be more than 2");
    } else {
      setShowSpinner(true);

      const { data, error } = await AddTask(updatedName);

      if (error === null) {
        setShow(!show);
        if (flag !== "complete" && data[0].name.includes(search)) {
          todos.unshift(data[0]);
        }
        setDataCount(dataCount + 1);
        setTaskvalue("");
      }
      AddToast(error, error ? "Could not added task" : "New Task Added");

      setShowSpinner(false);
    }
  };
  const moreValue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTop(top + 12);

      setIsLoading(false);
    }, 300);
  };
  const showless = () => {
    setTop(12);
  };
  return (
    <div>
      <div className="add-task">
        <h1>Add Tasks</h1>
      </div>
      <div className={classNames({ blur: isLoading })}>
        <div className="head__header-class">
          <Button
            className={classNames("btn btn__create", { blur: show })}
            onClick={toggleHandler}
            disabled={show}
          >
            <Icon src="Plus" />
            Create
          </Button>
          <div className="btn btn__top-button--all">
            <Button
              className={classNames("btn btn__top-button", {
                "btn btn__blur-button":
                  (dataCount === 0 || flag === "all") && !isLoading,
              })}
              disabled={dataCount === 0}
              onClick={() => {
                setShow(false);
                flagHandler("all");
              }}
            >
              All
            </Button>
            <Button
              className={classNames("btn btn__top-button", {
                "btn btn__blur-button":
                  (dataCount === 0 || flag === "incomplete") && !isLoading,
              })}
              disabled={dataCount === 0}
              onClick={() => {
                setShow(false);
                flagHandler("incomplete");
              }}
            >
              Incomplete
            </Button>
            <Button
              className={classNames("btn btn__top-button", {
                "btn btn__blur-button":
                  (dataCount === 0 || flag === "complete") && !isLoading,
              })}
              disabled={dataCount === 0}
              onClick={() => {
                setShow(false);
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
                  className={classNames("textarea__edit-name", {
                    blur: showSpinner,
                  })}
                  placeholder="Add new task"
                  autoFocus
                  onChange={(event) => task(event.target.value)}
                  readOnly={showSpinner}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (!showSpinner) {
                        addhandler(event);
                      }
                    }
                  }}
                  onFocus={function (event) {
                    var val = event.target.value;
                    event.target.value = "";
                    event.target.value = val;
                  }}
                  value={taskvalue}
                />
              </div>
              <div className="todo__add-del">
                <Button
                  className={classNames("btn btn__save-button", {
                    blur: showSpinner,
                  })}
                  onClick={addhandler}
                >
                  Add Task
                </Button>
                <Button
                  className="btn btn__boxed-button"
                  onClick={toggleHandler}
                >
                  <Icon src="Delete" />
                </Button>
              </div>

              {showSpinner && (
                <div>
                  <Icon
                    className="logo__spinning logo__rotate-div"
                    src="Spin"
                  />
                </div>
              )}
            </div>
          )}
          {todos.slice(0, top).map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </div>

        {!isLoading && (
          <div className="bottom-button">
            {todos.length <= 12 ? null : top <= todos.length ? (
              <div className="btn btn__load-more--over">
                <Button
                  className="btn btn__load-more--btn-container"
                  onClick={moreValue}
                >
                  Load More
                </Button>
              </div>
            ) : (
              <div className="btn btn__load-more--over">
                <Button
                  className="btn btn__load-more--btn-container"
                  onClick={showless}
                >
                  Show Less
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;

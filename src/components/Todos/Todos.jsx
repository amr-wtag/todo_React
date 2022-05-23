/* eslint-disable react-hooks/rules-of-hooks */

import classNames from "classnames";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../App";
import { supabase } from "../../config/apiClient";
import Button from "../Button";
import Icon from "../Icon";
import TextArea from "../TextArea";
import Todo from "../Todo";
const Todos = () => {
  const {
    todos,
    flagHandler,
    flag,
    toasts,
    dataCount,
    setToasts,
    search,
    setDataCount,
    setIsEmpty,
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
    setShow(!show);
    setIsEmpty(show);
  };
  const addhandler = async () => {
    const updatedName = taskvalue
      .trim()
      .replace(/\s+/g, " ")
      .replace(/(<([^>]+)>)/gi, "");
    if (updatedName.length < 3) {
      let newToast = {
        id: uuidv4(),
        type: "error",
        message: "Task must be more then 3 character",
      };
      setToasts([...toasts, newToast]);
    } else {
      setShowSpinner(true);

      const { data, error } = await supabase.from("ReactTodo").insert([
        {
          name: updatedName,
          created_at: new Date(Date.now()),
        },
      ]);

      if (error === null) {
        setShow(!show);
        if (flag !== "complete" && data[0].name.includes(search)) {
          todos.unshift(data[0]);
        }
        setDataCount(dataCount + 1);
        setTaskvalue("");
      }
      let newToast = {
        id: uuidv4(),
        type: error ? "error" : "success",
        message: error ? error.message : "New Task added",
      };
      setToasts([...toasts, newToast]);

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
      <div className="addTask">
        <h1 className="addTaskH1">Add Tasks</h1>
      </div>
      <div className={classNames({ blur: isLoading })}>
        <div className="head__headerClass">
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
      <div>
        {isLoading && (
          <Icon className="logo__spinning logo__rotate-full" src="Spin" />
        )}
      </div>
    </div>
  );
};

export default Todos;

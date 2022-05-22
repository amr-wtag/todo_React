/* eslint-disable react-hooks/rules-of-hooks */
//absolute imports
import classNames from "classnames";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//relative imports
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
  const task = (e) => {
    setTaskvalue(e);
  };
  const toggleHandler = (e) => {
    e.preventDefault();
    setShow(!show);
    setIsEmpty(show);
  };
  const addhandler = async (e) => {
    if (
      taskvalue
        .trim()
        .replace(/\s+/g, " ")
        .replace(/(<([^>]+)>)/gi, "").length < 3
    ) {
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
          name: taskvalue
            .trim()
            .replace(/\s+/g, " ")
            .replace(/(<([^>]+)>)/gi, ""),
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
  const moreValue = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      setTop(top + 12);

      setIsLoading(false);
    }, 300);
  };
  const showless = (e) => {
    setTop(12);
  };
  return (
    <div>
      <div className="addTask">
        <h1 className="addTaskH1">Add Tasks</h1>
      </div>
      <div className={classNames({ blur: isLoading })}>
        <div className="headerClass">
          <Button
            className={classNames("create", { blur: show })}
            onClick={toggleHandler}
            disabled={show}
          >
            <Icon src="Plus" />
            Create
          </Button>
          <div className="topButtonAll">
            <Button
              className={classNames("topButton", {
                blurButton: (dataCount === 0 || flag === "all") && !isLoading,
              })}
              disabled={dataCount === 0}
              onClick={(e) => {
                setShow(false);
                flagHandler("all");
              }}
            >
              All
            </Button>
            <Button
              className={classNames("topButton", {
                blurButton:
                  (dataCount === 0 || flag === "incomplete") && !isLoading,
              })}
              disabled={dataCount === 0}
              onClick={(e) => {
                setShow(false);
                flagHandler("incomplete");
              }}
            >
              Incomplete
            </Button>
            <Button
              className={classNames("topButton", {
                blurButton:
                  (dataCount === 0 || flag === "complete") && !isLoading,
              })}
              disabled={dataCount === 0}
              onClick={(e) => {
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
                  className={classNames("textarea-editName", {
                    blur: showSpinner,
                  })}
                  placeholder="Add new task"
                  autoFocus
                  onChange={(e) => task(e.target.value)}
                  readOnly={showSpinner}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (!showSpinner) {
                        addhandler(e);
                      }
                    }
                  }}
                  onFocus={function (e) {
                    var val = e.target.value;
                    e.target.value = "";
                    e.target.value = val;
                  }}
                />
              </div>
              <div className="todo-addDel">
                <Button
                  className={classNames("saveButton", { blur: showSpinner })}
                  onClick={addhandler}
                >
                  Add Task
                </Button>
                <Button className="boxedButton" onClick={toggleHandler}>
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
            <Todo todo={todo} key={todo.id} />
          ))}
        </div>

        {!isLoading && (
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
        {isLoading && <Icon className="spinning rotateFull" src="Spin" />}
      </div>
    </div>
  );
};

export default Todos;

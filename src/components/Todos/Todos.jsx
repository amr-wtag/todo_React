/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from "react";
import Todo from "../Todo";
import TextArea from "../TextArea";
import Icon from "../Icon";
import Button from "../Button";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../config/apiClient";
import { AppContext } from "../../App";
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
    setShowEmpty,
  } = useContext(AppContext);

  const [top, setTop] = useState(12);
  const [showSpinner, setShowSpinner] = useState(false);
  const [taskvalue, setTaskvalue] = useState("");
  const [showFullSpinner, setShowFullSpinner] = useState(false);
  const [show, setShow] = useState(false);
  // addhandler
  //add task value
  const task = (e) => {
    setTaskvalue(e);
  };
  const toggleHandler = (e) => {
    e.preventDefault();
    setShow(!show);
    setShowEmpty(show);
  };
  const addhandler = async (e) => {
    if (taskvalue.length < 3) {
      let newToast = {
        id: uuidv4(),
        type: "error",
        message: "Task must be more then 3 character",
      };
      setToasts([...toasts, newToast]);
    } else {
      setShowSpinner(true);
      try {
        const { data } = await supabase
          .from("ReactTodo")
          .insert([{ name: taskvalue, created_at: new Date(Date.now()) }]);

        setShow(!show);
        if (flag !== "complete" && data[0].name.includes(search)) {
          todos.unshift(data[0]);
        }
        setDataCount(dataCount + 1);
        let newToast = {
          id: uuidv4(),
          type: "success",
          message: "New Task added",
        };
        setToasts([...toasts, newToast]);
        setTaskvalue("");
      } catch (error) {
        let newToast = {
          id: uuidv4(),
          type: "error",
          message: "error",
        };
        setToasts([...toasts, newToast]);
      }
      setShowSpinner(false);
    }
  };
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
      <div className={`${showFullSpinner && "blur"}`}>
        <div className="addTask">
          <h1 className="addTaskH1">Add Tasks</h1>
        </div>

        <div className="headerClass">
          <Button className="create btn" onClick={toggleHandler}>
            <Icon src="Plus" />
            Create
          </Button>
          <div className={`topButtonAll `}>
            <Button
              className={`topButton ${
                (dataCount === 0 || flag === "all") && "blurButton"
              }`}
              disabled={dataCount === 0}
              onClick={(e) => {
                flagHandler("all");
              }}
            >
              All
            </Button>
            <Button
              className={`topButton ${
                (dataCount === 0 || flag === "incomplete") && "blurButton"
              }`}
              disabled={dataCount === 0}
              onClick={(e) => {
                flagHandler("incomplete");
              }}
            >
              Incomplete
            </Button>
            <Button
              className={`topButton  ${
                (dataCount === 0 || flag === "complete") && "blurButton"
              } `}
              disabled={dataCount === 0}
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
                  className={`textarea-editName ${showSpinner && "blur"}`}
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
              <div className="todo-addDel">
                <Button
                  className={`saveButton ${showSpinner && "blur"}`}
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

export default Todos;

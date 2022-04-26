/* eslint-disable array-callback-return */

import "./App.css";

import { useState, useEffect } from "react";
import Todos from "./Todos";
import Header from "./Header";
import { Icon } from "./components/Icon";
import { Tag } from "./components/Tag";
import { v4 as uuidv4 } from "uuid";
import { Toaster } from "./components/Toaster";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Hello",
      created_at: "03/30/2022",
      completed_on: null,
      isLoading: false,
      isEdit: false,
    },
    {
      id: 2,
      name: "Hola",
      created_at: "03/30/2022",
      completed_on: null,
      isLoading: false,
      isEdit: false,
    },
    {
      id: 3,
      name: "dshdksgh",
      created_at: "03/30/2022",
      completed_on: null,
      isLoading: false,
      isEdit: false,
    },
    {
      id: 4,
      name: "Running",
      created_at: "03/30/2022",
      completed_on: null,
      isLoading: false,
      isEdit: false,
    },
    {
      id: 5,
      name: "Hello",
      created_at: "03/30/2022",
      completed_on: "03/30/2022",
      isLoading: false,
      isEdit: false,
    },
    {
      id: 6,
      name: "Hola",
      created_at: "03/30/2022",
      completed_on: null,
      isLoading: false,
      isEdit: false,
    },
    {
      id: 7,
      name: "dshdksgh",
      created_at: "03/30/2022",
      completed_on: "03/30/2022",
      isLoading: false,
      isEdit: false,
    },
    {
      id: 8,
      name: "Running",
      created_at: "03/30/2022",
      completed_on: "03/30/2022",
      isLoading: false,
      isEdit: false,
    },
    {
      id: 9,
      name: "Hello",
      created_at: "03/30/2022",
      completed_on: "03/30/2022",
      isLoading: false,
      isEdit: false,
    },
    {
      id: 10,
      name: "Hola",
      created_at: "03/30/2022",
      completed_on: null,
      isLoading: false,
      isEdit: false,
    },
    {
      id: 11,
      name: "dshdksgh",
      created_at: "03/30/2022",
      completed_on: "03/30/2022",
      isLoading: false,
      isEdit: false,
    },
    {
      id: 12,
      name: "Running",
      created_at: "03/30/2022",
      completed_on: "03/30/2022",
      isLoading: false,
      isEdit: false,
    },
    {
      id: 13,
      name: "Hello",
      created_at: "03/30/2022",
      completed_on: "03/30/2022",
      isLoading: false,
      isEdit: false,
    },
    {
      id: 14,
      name: "Hola",
      created_at: "03/31/2022",
      completed_on: null,
      isLoading: false,
      isEdit: false,
    },
    {
      id: 15,
      name: "dshdksgh",
      created_at: "07/04/2022",
      completed_on: "07/07/2022",
      isLoading: false,
      isEdit: false,
    },
    {
      id: 16,
      name: "Running",
      created_at: "03/30/2022",
      completed_on: "04z/04/2022",
      isLoading: false,
      isEdit: false,
    },
  ]);

  const [toasts, setToasts] = useState([]);
  const [show, setShow] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showBigSpinner, setShowBigSpinner] = useState(false);
  const [taskvalue, setTaskvalue] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [flag, setFlag] = useState("all");
  const [showTodos, setShowTodos] = useState(todos);
  const [search, setSearch] = useState("");
  const [todoLength, setTodoLength] = useState(0);
  const [splash, setSplash] = useState(true);

  // Delete task
  const deletetodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    let tempTodos = [...todos];
    tempTodos[index].isLoading = true;
    setTodos(tempTodos);

    setTimeout(() => {
      setTodos(todos.filter((todo) => todo.isLoading !== true));
      // toaster
      let newToast = {
        id: uuidv4(),
        type: "success",
        message: "Task Deleted",
      };
      let allToast = [...toasts];
      allToast.push(newToast);
      setToasts(allToast);
    }, 500);
  };
  //edit toggle
  const editToggle = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    let tempTodos = [...todos];
    tempTodos[index].isEdit = !tempTodos[index].isEdit;
    setTodos(tempTodos);
  };
  //flag
  const flagHandler = (e) => {
    if (flag !== e) {
      setShowBigSpinner(true);
      setTimeout(() => {
        setFlag(e);
        setShowBigSpinner(false);
      }, 1000);
    }
  };

  // on Complete

  const completeHandler = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    let tempTodos = [...todos];
    if (tempTodos[index].isEdit) editToggle(id);
    tempTodos[index].isLoading = true;
    setTodos(tempTodos);
    setTimeout(() => {
      tempTodos = [...todos];
      tempTodos[index].completed_on = new Date(Date.now()).toLocaleDateString();
      tempTodos[index].isLoading = false;
      setTodos(tempTodos);
      let newToast = {
        id: uuidv4(),
        type: "success",
        message: "Task Complted",
      };
      let allToast = [...toasts];
      allToast.push(newToast);
      setToasts(allToast);
    }, 1000);
  };
  //search value
  const searchvalue = (e) => {
    if (e.length > 2 /*  || e.length === 0 */) {
      setTimeout(() => {
        setShowBigSpinner(true);
      }, 500);
      setTimeout(() => {
        setSearch(e);
        setShowBigSpinner(false);
      }, 1500);
    }
  };
  //add task value
  const task = (e) => {
    setTaskvalue(e);
  };
  // addhandler
  const addhandler = (e) => {
    if (taskvalue.length < 3) {
      let newToast = {
        id: uuidv4(),
        type: "error",
        message: "Task must be more then 3 character",
      };
      let allToast = [...toasts];
      allToast.push(newToast);
      setToasts(allToast);
    } else {
      setShowSpinner(true);
      setTimeout(() => {
        let newTodo = {
          id: uuidv4(),
          name: taskvalue,
          created_at: new Date(Date.now()).toLocaleDateString(),
          completed_on: null,
          isLoading: false,
          isEdit: false,
        };
        let tempTodos = [newTodo, ...todos];

        setTodos(tempTodos);
        togglehandler();
        setShowSpinner(false);
        let newToast = {
          id: uuidv4(),
          type: "success",
          message: "New Task added",
        };
        let allToast = [...toasts];
        allToast.push(newToast);
        setToasts(allToast);
      }, 500);
    }
  };
  //toggle
  const togglehandler = (e) => {
    setTaskvalue("");
    setShow(!show);
  };
  //search toggle
  const SearchToggle = () => {
    if (search !== "") {
      setShowBigSpinner(true);
      setTimeout(() => {
        setSearch("");
        setShowBigSpinner(false);
      }, 500);
    }
    setSearchShow(!searchShow);
  };
  //splash useEffect
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 1000);
  }, []);
  // useEffect
  useEffect(() => {
    setTodoLength(todos.length);
    const arr = [];
    if (flag === "all") {
      todos.map((todo) => {
        if (todo.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          arr.push(todo);
        // setShowTodos(arr);
      });
    } else if (flag === "incomplete") {
      todos.map((todo) => {
        if (
          todo.completed_on === null &&
          todo.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
          arr.push(todo);
        // setShowTodos(arr);
      });
    } else {
      todos.map((todo) => {
        if (
          todo.completed_on !== null &&
          todo.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
          arr.push(todo);
      });
    }
    if (todos.length === 0) setFlag("all");
    setShowTodos(arr);
  }, [flag, todos, search, toasts]);
  //Toast useeffect
  useEffect(() => {
    if (toasts.length > 0) {
      setTimeout(() => {
        let allToast = [...toasts];
        allToast.shift();
        setToasts(allToast);
      }, 500);
    }
  }, [toasts]);
  return (
    <div className="App">
      {splash && (
        <div className="splash faddingOut">
          <div className="splashLogo">
            <div className="splashIconLogo">
              <Icon src="SplashLeaf" />
            </div>
            <div>
              <Icon src="SplashTitle" />
            </div>
          </div>
        </div>
      )}
      {!splash && (
        <div>
          <Header
            SearchToggle={SearchToggle}
            searchShow={searchShow}
            searchvalue={searchvalue}
            showBigSpinner={showBigSpinner}
            todoLength={todoLength}
          />
          <div className="overToaster">
            <div className="toaster">
              {toasts.length > 0 &&
                toasts.map((toast) => (
                  <Toaster
                    key={toast.id}
                    className={`faddingOut toast toast--visible toast--${toast.type}`}
                  >
                    {toast.type === "success" && <Icon src="Check" />}{" "}
                    {toast.message}
                  </Toaster>
                ))}
            </div>
          </div>
          <Todos
            todos={showTodos}
            allTodos={todos}
            onDelete={deletetodo}
            completeHandler={completeHandler}
            show={show}
            togglehandler={togglehandler}
            addhandler={addhandler}
            task={task}
            showSpinner={showSpinner}
            showBigSpinner={showBigSpinner}
            todoLength={todoLength}
            flagHandler={flagHandler}
            editToggle={editToggle}
            setTodos={setTodos}
            toasts={toasts}
            setToasts={setToasts}
          />

          <div>
            {showBigSpinner && (
              <Icon className="spinning rotateFull" src="Spin" />
            )}
          </div>
          {todoLength === 0 && !show && (
            <div className={`emptyScreenOver ${showBigSpinner && "blur"}`}>
              <Icon src="EmptyScreen" className="emptyScreen" />
              <Tag className="pleaseAdd">
                You didn't add any task. Please, add one.
              </Tag>
            </div>
          )}
          {todoLength !== 0 && showTodos.length === 0 && !show && (
            <div className={`emptyScreenOver ${showBigSpinner && "blur"}`}>
              <Icon src="EmptyScreen" className="emptyScreen" />
              <Tag className="pleaseAdd"> There is no data for {flag}</Tag>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

/* eslint-disable array-callback-return */
//absolute imports
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//relative imports
import "./App.css";
import Header from "./components/Header";
import Icon from "./components/Icon";
import Tag from "./components/Tag";
import Toaster from "./components/Toaster";
import Todos from "./components/Todos";
import { supabase } from "./config/apiClient";

export const AppContext = React.createContext();

function App() {
  const [todos, setTodos] = useState([]);

  const [toasts, setToasts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [flag, setFlag] = useState("all");
  const [search, setSearch] = useState("");
  const [dataCount, setDataCount] = useState(0);
  const [splash, setSplash] = useState(true);
  const [isFlagChange, setIsFlagChange] = useState(false);
  const [prevFlag, setPrevFlag] = useState("all");
  const [progress, setProgress] = useState(true);
  //flag
  const flagHandler = (event) => {
    if (flag !== event) {
      setIsFlagChange(true);
      setPrevFlag(flag);
      setFlag(event);
    }
  };
  const removeCompleteFromIncomplete = (id) => {
    const filtertodos = todos.filter((todo) => todo.id !== id);
    setTodos(filtertodos);
  };
  //search value
  const searchvalue = (event) => {
    if (event.length > 2) {
      setIsLoading(true);
      setSearch(event);

      setIsLoading(false);
    }
  };

  //search toggle
  const SearchToggle = () => {
    if (search !== "") {
      setIsLoading(true);
      setSearch("");
      setIsLoading(false);
    }
    setSearchShow(!searchShow);
  };

  // useEffect
  useEffect(() => {
    const fetchData = async (event) => {
      setIsLoading(true);
      let newToast;
      switch (flag) {
        case "all": {
          const { data, error } = await supabase
            .from("ReactTodo")
            .select()
            .ilike("name", `%${search}%`)
            .order("id", { ascending: false });

          if (error) {
            if (isFlagChange) {
              setFlag(prevFlag);
            }
            if (splash) {
              setProgress(false);
              setSplash(false);
            }
          } else {
            setTodos([]);
            setTodos(data);
            if (splash) {
              setDataCount(data.length);
              setProgress(false);
              setTimeout(() => {
                setSplash(false);
              }, 500);
            }
          }
          newToast = {
            id: uuidv4(),
            type: error ? "error" : "success",
            message: error ? error.message : "All Data fetched",
          };
          setToasts([...toasts, newToast]);
          break;
        }
        case "incomplete": {
          const { data, error } = await supabase
            .from("ReactTodo")
            .select()
            .ilike("name", `%${search}%`)
            .is("completed_on", null)
            .order("id", { ascending: false });

          if (error === null) {
            setTodos([]);
            setTodos(data);
          } else {
            setFlag(prevFlag);
            setIsFlagChange(false);
          }

          newToast = {
            id: uuidv4(),
            type: error ? "error" : "success",
            message: error ? error.message : "Incompleted Data fetched",
          };

          setToasts([...toasts, newToast]);
          break;
        }
        default: {
          const { data, error } = await supabase
            .from("ReactTodo")
            .select()
            .ilike("name", `%${search}%`)
            .order("id", { ascending: false })
            .not("completed_on", "is", null);
          if (error === null) {
            setTodos([]);
            setTodos(data);
          } else {
            setFlag(prevFlag);
            setIsFlagChange(false);
          }

          newToast = {
            id: uuidv4(),
            type: error ? "error" : "success",
            message: error ? error.message : "Completed Data fetched",
          };
          setToasts([...toasts, newToast]);
        }
      }
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, search]);

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

  const handleRemoveTodo = async (id) => {
    let newToast;
    // eslint-disable-next-line
    const { data, error } = await supabase
      .from("ReactTodo")
      .delete()
      .match({ id: id });

    if (error === null) {
      setDataCount(dataCount - 1);
      removeCompleteFromIncomplete(id);
      if (dataCount === 0) {
        setSearchShow(false);
        setFlag("all");
      }
    }
    newToast = {
      id: uuidv4(),
      type: error ? "error" : "success",
      message: error ? error.message : "Task Deleted",
    };
    setToasts([...toasts, newToast]);
  };

  return (
    <div className="App">
      {splash && (
        <div>
          <div className="container">
            {" "}
            <div
              className={classNames({
                "progress-bar": progress,
                "fullprogress-bar": !progress,
              })}
            ></div>
          </div>
          <div className="splash faddingOut  ">
            <div className="splashLogo">
              <div className="splashIconLogo">
                <Icon src="SplashLeaf" />
              </div>
              <div>
                <Icon src="SplashTitle" />
              </div>
            </div>
          </div>
        </div>
      )}
      {!splash && (
        <div>
          <AppContext.Provider
            value={{
              SearchToggle,
              searchShow,
              searchvalue,
              dataCount,
              isLoading,
            }}
          >
            <Header />
          </AppContext.Provider>
          <div className="overToaster">
            <div className="toaster">
              {toasts.length > 0 &&
                toasts.map((toast) => (
                  <Toaster
                    key={toast.id}
                    className={`faddingtoastOut toast toast--visible toast--${toast.type}`}
                  >
                    {toast.type === "success" && <Icon src="Check" />}{" "}
                    {toast.message}
                  </Toaster>
                ))}
            </div>
          </div>
          <div className="bodyClass">
            <AppContext.Provider
              value={{
                todos,
                flag,
                flagHandler,
                toasts,
                search,
                setToasts,
                dataCount,
                setDataCount,
                setIsEmpty,
                isLoading,
                setIsLoading,
                removeCompleteFromIncomplete,
                handleRemoveTodo,
              }}
            >
              <Todos />
            </AppContext.Provider>
          </div>

          <div>
            {isLoading && <Icon className="spinning rotateFull" src="Spin" />}
          </div>

          {isEmpty && dataCount === 0 && !isLoading && (
            <div className={`emptyScreenOver `}>
              <Icon src="EmptyScreen" className="emptyScreen" />
              <Tag className="tag-pleaseAdd">
                You didn't add any task. Please, add one.
              </Tag>
            </div>
          )}
          {isEmpty && dataCount > 0 && todos.length === 0 && !isLoading && (
            <div className={`emptyScreenOver `}>
              <Icon src="EmptyScreen" className="emptyScreen" />
              <Tag className="tag-pleaseAdd"> There is no data for {flag}</Tag>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

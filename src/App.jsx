/* eslint-disable array-callback-return */

import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Header from "./components/Header";
import Icon from "./components/Icon";
import Tag from "./components/Tag";
import Toaster from "./components/Toaster";
import Todos from "./components/Todos";
import { DeleteData, fetchValue } from "./config/ApiCall";

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
    const fetchData = async () => {
      let newToast;
      setIsLoading(true);
      const { data, error } = await fetchValue(flag, search);

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
        message: error ? error.message : "Data fetched",
      };
      setToasts([...toasts, newToast]);

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
    const { data, error } = await DeleteData(id);

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
    <div className="app">
      {splash && (
        <div>
          <div className="container">
            {" "}
            <div
              className={classNames({
                "progress-bar": progress,
                "full-progress-bar": !progress,
              })}
            ></div>
          </div>
          <div className="app__splash fadding-out">
            <div className="logo logo__splash-logo ">
              <div className="logo logo__splash__icon-logo">
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
          <div className="toast__over-toaster">
            <div className="toast__toaster">
              {toasts.length > 0 &&
                toasts.map((toast) => (
                  <Toaster
                    key={toast.id}
                    className={`toast__fadding-toast-out toast toast--visible toast--${toast.type}`}
                  >
                    {toast.type === "success" && <Icon src="Check" />}{" "}
                    {toast.message}
                  </Toaster>
                ))}
            </div>
          </div>
          <div className="app__body-class">
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
            {isLoading && (
              <Icon className="logo__spinning logo__rotate-full" src="Spin" />
            )}
          </div>

          {isEmpty && dataCount === 0 && !isLoading && (
            <div className="logo__empty-screen-over">
              <Icon src="empty-screen" className="logo__empty-screen" />
              <Tag className="tag__empty-screen">
                You didn't add any task. Please, add one.
              </Tag>
            </div>
          )}
          {isEmpty && dataCount > 0 && todos.length === 0 && !isLoading && (
            <div className="logo__empty-screen-over">
              <Icon src="empty-screen" className="logo__empty-screen" />
              <Tag className="tag__empty-screen">
                {" "}
                There is no data for {flag}
              </Tag>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

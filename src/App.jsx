/* eslint-disable array-callback-return */

import "./App.css";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import Todos from "./components/Todos";
import Header from "./components/Header";
import Icon from "./components/Icon";
import Tag from "./components/Tag";
import Toaster from "./components/Toaster";
import { supabase } from "./config/apiClient";
export const AppContext = React.createContext();

function App() {
  const [todos, setTodos] = useState([]);

  const [toasts, setToasts] = useState([]);
  const [showEmpty, setShowEmpty] = useState(true);
  const [showBigSpinner, setShowBigSpinner] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [flag, setFlag] = useState("all");
  const [search, setSearch] = useState("");
  const [dataCount, setDataCount] = useState(0);
  const [splash, setSplash] = useState(true);

  //flag
  const flagHandler = (e) => {
    if (flag !== e) {
      setFlag(e);
    }
  };
  const removeCompleteFromIncomplete = (id) => {
    const filtertodos = todos.filter((todo) => todo.id !== id);
    setTodos(filtertodos);
  };
  //search value
  const searchvalue = (e) => {
    if (e.length > 2) {
      /* setTimeout(() => { */
      /* }, 500); */
      // setTimeout(() => {
      setShowBigSpinner(true);
      setSearch(e);
      // }, 500);
      setShowBigSpinner(false);
    }
  };

  //search toggle
  const SearchToggle = () => {
    if (search !== "") {
      setShowBigSpinner(true);
      setSearch("");
      setShowBigSpinner(false);
    }
    setSearchShow(!searchShow);
  };

  // useEffect
  useEffect(() => {
    const fetchData = async (e) => {
      setShowBigSpinner(true);
      if (flag === "all") {
        try {
          const { data } = await supabase
            .from("ReactTodo")
            .select()
            .ilike("name", `%${search}%`)
            .order("id", { ascending: false });
          setTodos([]);
          // setDataCount(data.length);
          setTodos(data);
          let newToast = {
            id: uuidv4(),
            type: "success",
            message: "All Data fetched",
          };

          if (splash) {
            setDataCount(data.length);
            setTimeout(() => {
              setSplash(false);
            }, 500);
          }
          setToasts([...toasts, newToast]);
        } catch (error) {
          let newToast = {
            id: uuidv4(),
            type: "error",
            message: error,
          };

          setToasts([...toasts, newToast]);
        }
      } else if (flag === "incomplete") {
        try {
          const { data } = await supabase
            .from("ReactTodo")
            .select()
            .ilike("name", `%${search}%`)
            .is("completed_on", null)
            .order("id", { ascending: false });

          setTodos([]);
          setTodos(data);
          let newToast = {
            id: uuidv4(),
            type: "success",
            message: "Incompleted Data fetched",
          };

          setToasts([...toasts, newToast]);
        } catch (error) {
          let newToast = {
            id: uuidv4(),
            type: "error",
            message: error,
          };

          setToasts([...toasts, newToast]);
        }
      } else {
        try {
          const { data } = await supabase
            .from("ReactTodo")
            .select()
            .ilike("name", `%${search}%`)
            .order("id", { ascending: false })
            .not("completed_on", "is", null);

          setTodos([]);
          setTodos(data);
          let newToast = {
            id: uuidv4(),
            type: "success",
            message: "Completed Data fetched",
          };

          setToasts([...toasts, newToast]);
        } catch (error) {
          let newToast = {
            id: uuidv4(),
            type: "error",
            message: error,
          };

          setToasts([...toasts, newToast]);
        }
      }

      setShowBigSpinner(false);
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
      }, 250);
    }
  }, [toasts]);
  const handleRemoveTodo = async (id) => {
    try {
      // eslint-disable-next-line
      const { data } = await supabase
        .from("ReactTodo")
        .delete()
        .match({ id: id });
      let newToast = {
        id: uuidv4(),
        type: "success",
        message: "Task Deleted",
      };

      setToasts([...toasts, newToast]);
    } catch (error) {
      let newToast = {
        id: uuidv4(),
        type: "error",
        message: error,
      };
      setToasts([...toasts, newToast]);
    }
    removeCompleteFromIncomplete(id);
    if (dataCount === 1) {
      setSearchShow(false);
      setFlag("all");
    }
  };

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
          <AppContext.Provider
            value={{
              SearchToggle,
              searchShow,
              searchvalue,
              dataCount,
              showBigSpinner,
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
          <div className={`${showBigSpinner && "blur"}`}>
            <AppContext.Provider
              value={{
                todos,
                flag,
                flagHandler,
                toasts,
                setToasts,
                dataCount,
                setDataCount,
                setShowEmpty,
                removeCompleteFromIncomplete,
                handleRemoveTodo,
              }}
            >
              <Todos />
            </AppContext.Provider>
          </div>

          <div>
            {showBigSpinner && (
              <Icon className="spinning rotateFull" src="Spin" />
            )}
          </div>

          {showEmpty && dataCount === 0 && !showBigSpinner && (
            <div className={`emptyScreenOver `}>
              <Icon src="EmptyScreen" className="emptyScreen" />
              <Tag className="tag-pleaseAdd">
                You didn't add any task. Please, add one.
              </Tag>
            </div>
          )}
          {showEmpty && dataCount > 0 && todos.length === 0 && !showBigSpinner && (
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

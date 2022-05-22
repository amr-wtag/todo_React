//absolute imports
import classNames from "classnames";
import React, { useContext } from "react";
//relative imports
import { AppContext } from "../../App";
import Button from "../Button";
import Icon from "../Icon";
import Input from "../Input";
const Header = () => {
  const { SearchToggle, searchShow, searchvalue, dataCount, isLoading } =
    useContext(AppContext);
  const searchHandler = (event) => {
    searchvalue(event.target.value);
  };
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      const later = () => {
        timer = null;
        fn.call(this, ...args);
      };
      clearTimeout(timer);
      timer = setTimeout(later, delay);
    };
  };
  // const optimizedVersion = debounce(searchHandler, 500);
  return (
    <div className={"overHead "}>
      <div className="Header">
        <div className="logo">
          <div className="IconLogo">
            <Icon src="Leaf" />
          </div>
          <div>
            <Icon src="Title" />
          </div>
        </div>
        <div className="searchInputButton">
          {searchShow && (
            <Input
              id="search"
              autoFocus
              className="input-search"
              readOnly={isLoading}
              onKeyUp={debounce(searchHandler, 500)}
            />
          )}
          <Button
            className={classNames("searchButton", {
              blurButton: dataCount === 0,
            })}
            onClick={SearchToggle}
          >
            <Icon src="Search" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;

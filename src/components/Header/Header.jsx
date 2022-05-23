import classNames from "classnames";
import React, { useContext } from "react";
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
    <div className={"head__overHead"}>
      <div className="head__Header">
        <div className="logo">
          <div className="logo logo__icon-logo">
            <Icon src="Leaf" />
          </div>
          <div>
            <Icon src="Title" />
          </div>
        </div>
        <div className="head__searchInputButton">
          {searchShow && (
            <Input
              id="search"
              autoFocus
              className="input__search"
              readOnly={isLoading}
              onKeyUp={debounce(searchHandler, 500)}
            />
          )}
          <Button
            className={classNames("btn btn__search-button", {
              "btn btn__blur-button": dataCount === 0,
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

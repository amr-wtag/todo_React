import React, { useContext } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Input from "../Input";
import { AppContext } from "../../App";
const Header = () => {
  const { SearchToggle, searchShow, searchvalue, dataCount, showBigSpinner } =
    useContext(AppContext);
  const searchHandler = (e) => {
    searchvalue(e.target.value);
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
    <div className={`overHead `}>
      <div className="Header">
        <div className="logo">
          <div className="IconLogo">
            <Icon src="Leaf" />
          </div>
          <div>
            <Icon src="Title" />
          </div>
        </div>
        <div className={`searchInputButton `}>
          {searchShow && (
            <Input
              id="search"
              autoFocus
              className="input-search"
              readOnly={showBigSpinner}
              onKeyUp={debounce(searchHandler, 500)}
            />
          )}
          <Button
            className={`searchButton ${dataCount === 0 && "blurButton"}`}
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

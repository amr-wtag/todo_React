import React from "react";
import Button from "../Button";
import Icon from "../Icon";
import Input from "../Input";
const Header = ({
  SearchToggle,
  searchShow,
  searchvalue,
  showBigSpinner,
  todoLength,
  dataCount,
}) => {
  return (
    <div className={`overHead ${showBigSpinner && "blur"}`}>
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
              className="search"
              onChange={(e) => searchvalue(e.target.value)}
            ></Input>
          )}
          <Button
            className={`searchButton ${
              (todoLength === 0 || dataCount === 0) && "blurButton"
            }`}
            disabled={todoLength === 0}
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

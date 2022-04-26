import React from "react";
import { Button } from "./components/Button";

import { Icon } from "./components/Icon";
const Header = ({
  SearchToggle,
  searchShow,
  searchvalue,
  showBigSpinner,
  todoLength,
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
            <input
              id="search"
              autoFocus
              className="search"
              onChange={(e) => searchvalue(e.target.value)}
            ></input>
          )}
          <Button
            className={`searchButton ${todoLength === 0 && "blurButton"}`}
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

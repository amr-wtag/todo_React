/* eslint-disable no-unused-vars */
import { mount } from "enzyme";
import React from "react";
import { AppContext } from "../../App";
import Header from "./index";
test("should Header component have Button component with class searchButton", () => {
  const mockFn = jest.fn();

  const output = mount(
    <AppContext.Provider
      value={{
        SearchToggle: mockFn,
        searchShow: false,
        searchvalue: "abcd",
        dataCount: 0,
        isLoading: false,
      }}
    >
      <Header />
    </AppContext.Provider>,
  );

  expect(output.find("Button").hasClass("searchButton")).toBe(false);
});

test("check context values of Header component", () => {
  const mockFn = jest.fn();

  const output = mount(
    <AppContext.Provider
      value={{
        SearchToggle: mockFn,
        searchShow: true,
        searchvalue: "abcd",
        dataCount: 0,
        isLoading: false,
      }}
    >
      <Header />
    </AppContext.Provider>,
  );
  expect(output.find("input").props().readOnly).toBeFalsy();
});

test("if loading is true input field will be read only", () => {
  const mockFn = jest.fn();

  const output = mount(
    <AppContext.Provider
      value={{
        SearchToggle: mockFn,
        searchShow: true,
        searchvalue: "abcd",
        dataCount: 0,
        isLoading: true,
      }}
    >
      <Header />
    </AppContext.Provider>,
  );
  expect(output.find("input").props().readOnly).toBeTruthy();
});

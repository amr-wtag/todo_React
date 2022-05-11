import React from "react";
import { mount, shallow } from "enzyme";
import Header from "../index";
import { AppContext } from "../../../App";
test("should Header component have Button component with class searchButton", () => {
  const mockFn = jest.fn();

  const output = mount(
    <AppContext.Provider
      value={{
        SearchToggle: mockFn,
        searchShow: false,
        searchvalue: "abcd",
        dataCount: 0,
        showBigSpinner: false,
      }}
    >
      <Header />
    </AppContext.Provider>,
    // <Button onClick={mockFn} />,
  );
  // console.log();

  expect(output.find("Button").hasClass("searchButton")).toBe(true);
  // eslint-disable-next-line testing-library/no-debugging-utils
  // console.log(output.find("IconLogo"));
  // expect(output.find("Input").id).toBe("search");
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
        showBigSpinner: false,
      }}
    >
      <Header />
    </AppContext.Provider>,
  );
  console.log(output.find("Button").props());
  expect(output.find("Input").props().readOnly).toBeFalsy();
});

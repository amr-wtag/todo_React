// import React from "react";
// import ReactDOM from "react-dom";
// import Button from "./../index";
// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<Button></Button>, div);
// });

import React from "react";
import { mount, shallow } from "enzyme";
import Button from "./../index";

test("should render the button component", () => {
  const output = shallow(<Button disabled={true} />);

  console.log(output.find("button").props());

  expect(output.find("button").props().disabled).toBe(true);
});

/* test("should render the span text", () => {
  const output = shallow(<Button text="abcd" />);
  console.log(output.find("span").children().text());

  expect(output.find("span").children().text()).toEqual("abcd");
}); */

test("should call the function on button click", () => {
  const mockFn = jest.fn();
  const output = mount(<Button onClick={mockFn} />);

  output.find("button").simulate("click");

  expect(mockFn).toHaveBeenCalled();
});

describe("writing test for span", () => {});

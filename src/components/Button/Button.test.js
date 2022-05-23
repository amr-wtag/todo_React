// import React from "react";
// import ReactDOM from "react-dom";
// import Button from "./../index";
// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<Button></Button>, div);
// });

import { mount, shallow } from "enzyme";
import React from "react";
import Button from "./index";

test("should render the button component", () => {
  const output = shallow(<Button disabled={true} />);

  expect(output.find("button").props().disabled).toBe(true);
});

test("should call the function on button click", () => {
  const mockFn = jest.fn();
  const output = mount(<Button onClick={mockFn} />);

  output.find("button").simulate("click");

  expect(mockFn).toHaveBeenCalled();
});

describe("writing test for span", () => {});

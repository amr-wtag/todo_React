
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

/* eslint-disable testing-library/no-debugging-utils */
import { mount } from "enzyme";
import React from "react";
import Tag from "./index";
test("should render Tag component", () => {
  const output = mount(<Tag className="tag-completed">abcd</Tag>);

  expect(output.props().className).toBe("tag-completed");
  expect(output.props().children).toBe("abcd");
});

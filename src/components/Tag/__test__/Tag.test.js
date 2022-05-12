import React from "react";
import { mount, shallow } from "enzyme";
import Tag from "../index";
test("should render Tag component", () => {
  const output = mount(
    <Tag id="showName" className="tag-completed">
      abcd
    </Tag>,
  );

  console.log(output.debug());
  expect(output.props().id).toBe("showName");
  expect(output.props().className).toBe("tag-completed");
  expect(output.props().children).toBe("abcd");
});

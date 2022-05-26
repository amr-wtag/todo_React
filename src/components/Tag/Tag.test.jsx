/* eslint-disable testing-library/no-debugging-utils */
import { mount } from "enzyme";
import React from "react";
import Tag from "./index";

describe("test tag component", () => {
  test("check span class name", () => {
    const output = mount(<Tag className="tag-completed">abcd</Tag>);

    expect(output.find("span").props().className).toBe("tag-completed");
    expect(output.props().children).toBe("abcd");
  });
  test("check span children", () => {
    const output = mount(<Tag className="tag-completed">abcd</Tag>);

    expect(output.find("span").props().children).toBe("abcd");
  });
});

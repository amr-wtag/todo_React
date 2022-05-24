import { /* mount, */ shallow } from "enzyme";
import React from "react";
import Input from "./index";

describe("checking Input componenet", () => {
  const wrapper = (id, className, autoFocus, onChange) => {
    return shallow(
      <Input
        id={id}
        className={className}
        onChange={onChange}
        autoFocus={autoFocus}
      />,
    );
  };

  test("input id should be input_id", () => {
    const output = wrapper("input_id", "input-class", true);
    expect(output.find("input").props().id).toBe("input_id");
  });
  test("input classname to be input-class", () => {
    const output = wrapper("input_id", "input-class", true);

    expect(output.find("input").props().className).toBe("input-class");
  });
  test("input onChange callback", () => {
    const onChangeMockFn = jest.fn();
    const output = wrapper("input_id", "input-class", true, onChangeMockFn);

    output.find("input").simulate("change");
    expect(onChangeMockFn).toHaveBeenCalled();
  });
});

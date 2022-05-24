import { /* mount, */ shallow } from "enzyme";
import React from "react";
import TextArea from "./index";

describe("checking textarea componenet", () => {
  test("textarea should render", () => {
    const output = shallow(<TextArea className={"abcd"} />);
    expect(output.find("textarea").props().className).toBe("abcd");
  });
  test("check TextArea component onchange event", () => {
    const mockFn = jest.fn();
    const output = shallow(<TextArea onChange={mockFn} />);
    output.find("textarea").simulate("change");

    expect(mockFn).toHaveBeenCalled();
  });
  test("check TextArea component autofocus to be truthy", () => {
    const output = shallow(<TextArea autoFocus={true} />);

    expect(output.find("textarea").props().autoFocus).toBeTruthy();
  });
  test("check TextArea component readonly tobe falsy", () => {
    const output = shallow(<TextArea readOnly={false} />);

    expect(output.find("textarea").props().readOnly).toBeFalsy();
  });
  test("check TextArea component onKeyPress", () => {
    const mockFn = jest.fn();
    const output = shallow(<TextArea onKeyPress={mockFn} />);
    output.find("textarea").simulate("keypress");

    expect(mockFn).toHaveBeenCalled();
  });
  test("check TextArea component onFocus", () => {
    const mockFn = jest.fn();
    const output = shallow(<TextArea onFocus={mockFn} />);
    output.find("textarea").simulate("focus");

    expect(mockFn).toHaveBeenCalled();
  });
  test("check TextArea component check value", () => {
    const output = shallow(<TextArea value="textarea value" />);

    expect(output.find("textarea").props().value).toBe("textarea value");
  });
  test("check TextArea component onChange", () => {
    const onChangeMockFn = jest.fn();
    const output = shallow(<TextArea onChange={onChangeMockFn} />);
    output.find("textarea").simulate("change");

    expect(onChangeMockFn).toHaveBeenCalled();
  });
});

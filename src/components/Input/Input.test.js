import { /* mount, */ shallow } from "enzyme";
import React from "react";
import Input from "./index";

describe("checking Input componenet", () => {
  test("input id should be input_id", () => {
    const output = shallow(
      <Input id="input_id" className={"input-class"} autoFocus={true} />,
    );
    expect(output.find("input").props().id).toBe("input_id");
  });
  test("input classname to be input-class", () => {
    const output = shallow(
      <Input id="input_id" className={"input-class"} autoFocus={true} />,
    );
    expect(output.find("input").props().className).toBe("input-class");
  });
});

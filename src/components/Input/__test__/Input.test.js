// import React from "react";
// import ReactDOM from "react-dom";
// import Button from "./../index";
// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<Button></Button>, div);
// });

import React from "react";
import { /* mount, */ shallow } from "enzyme";

import Input from "../index";
describe("checking Input componenet", () => {
  test("input id should be input_id", () => {
    const output = shallow(
      <Input id="input_id" className={"input-class"} autoFocus={true} />,
    );
    console.log(output.find("input").props());
    expect(output.find("input").props().id).toBe("input_id");
  });
  test("input classname to be input-class", () => {
    const output = shallow(
      <Input id="input_id" className={"input-class"} autoFocus={true} />,
    );
    expect(output.find("input").props().className).toBe("input-class");
  });
});

/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { /* mount, */ shallow } from "enzyme";
import Icon from "./../index";
test("should render Icon component", () => {
  const output = shallow(<Icon src="Tick" className="abcd" />);

  expect(output.props().className).toBe("abcd");
});

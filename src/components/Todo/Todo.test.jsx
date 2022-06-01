/* eslint-disable testing-library/no-debugging-utils */
import { mount } from "enzyme";
import { AppContext } from "../../App";
import Todo from "./index";

describe("checking todo component", () => {
  let output;
  beforeEach(() => {
    output = mount(
      <AppContext.Provider
        value={{
          handleRemoveTodo: jest.fn(),
          flag: "all",
          removeCompleteFromIncomplete: jest.fn(),
          addToast: jest.fn(),
          search: "",
          sanitize: jest.fn(),
        }}
      >
        <Todo
          todo={{
            id: 96,
            created_at: "2022-05-18",
            completed_on: null,
            name: "new task",
          }}
        />
      </AppContext.Provider>,
    );
  });
  test("todo component should be render", () => {
    expect(output.find(".todo").props().id).toBe("todo");
  });
  test("check created at", () => {
    expect(output.find(".todo__created-at").hostNodes().text()).toBe(
      "Created At: 18.05.22",
    );
  });
  test("checking showEdit state changing", () => {
    output.find("Button .btn__boxed-button").children().at(1).simulate("click");
    expect(output.find(".textarea__edit-name").hostNodes().length).toBe(1);
  });
  test("after save button clicked textarea will not show", () => {
    output.find("Button .btn__boxed-button").children().at(1).simulate("click");
    output
      .find(".textarea__edit-name")
      .hostNodes()
      .simulate("change", { target: { value: "abcd" } });
    output.find(".btn__save-button").hostNodes().simulate("click");
    expect(output.find(".textarea__edit-name").hostNodes().props().value).toBe(
      "abcd",
    );
  });
  test("if showEdit is true created at will not be available", () => {
    output.find("Button .btn__boxed-button").children().at(1).simulate("click");

    expect(output.find(".todo__created-at").hostNodes().length).toBe(0);
  });
});

/* eslint-disable testing-library/no-debugging-utils */
import { mount } from "enzyme";
import { AppContext } from "../../App";
import Todo from "./index";

describe("checking todo component", () => {
  let output;
  const mockFn = jest.fn();
  beforeEach(() => {
    output = mount(
      <AppContext.Provider
        value={{
          handleRemoveTodo: mockFn,
          flag: "all",
          removeCompleteFromIncomplete: mockFn,
          toasts: [],
          setToasts: mockFn,
          search: "",
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
    expect(output.find(".todo-createdAt").hostNodes().text()).toBe(
      "Created At: 18.05.22",
    );
  });
  test("checking showEdit state changing", () => {
    output.find("Button .boxedButton").children().at(1).simulate("click");
    expect(output.find(".textarea-editName").hostNodes().length).toBe(1);
  });
  test("after save button clicked textarea will not show", () => {
    output.find("Button .boxedButton").children().at(1).simulate("click");
    output.find(".saveButton").hostNodes().simulate("click");
    expect(output.find(".textarea-editName").hostNodes().length).toBe(0);
  });
  test("if showEdit is true created at will not be available", () => {
    output.find("Button .boxedButton").children().at(1).simulate("click");
    expect(output.find(".todo-createdAt").hostNodes().length).toBe(0);
  });
});

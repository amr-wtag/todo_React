/* eslint-disable testing-library/no-debugging-utils */
import { mount, shallow } from "enzyme";
import Todo from "../index";
import { AppContext } from "../../../App";
test("todo component should be render", () => {
  const mockFn = jest.fn();
  const output = mount(
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
  console.log(output.find(".todo-createdAt").props());
  expect(output.find(".todo").props().id).toBe("todo");
});

/* eslint-disable testing-library/no-debugging-utils */
import { mount } from "enzyme";
import { AppContext } from "../../App";
import { supabase } from "../../config/apiClient";
import Todos from "./index";

describe("checking todos component", () => {
  let output;
  const mockFn = jest.fn();

  beforeEach(() => {
    output = mount(
      <AppContext.Provider
        value={{
          todos: [
            {
              id: 1,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 2,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 3,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 4,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 5,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 6,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 7,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 8,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 9,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 10,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 11,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 12,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
            {
              id: 13,
              created_at: "2022-05-18",
              completed_on: null,
              name: "new task",
            },
          ],
          flag: "all",
          flagHandler: mockFn,
          search: "",
          Sanitize: mockFn,
          dataCount: 13,
          setDataCount: mockFn,
          setIsEmpty: mockFn,

          setIsLoading: mockFn,
          handleRemoveTodo: mockFn,
          isLoading: false,
        }}
      >
        <Todos />
      </AppContext.Provider>,
    );
  });

  test("function are called after click", () => {
    expect(output.find(".btn__load-more--over").length).toBe(1);
  });
  test("check button have been clicked", () => {
    output.find(".btn__top-button").hostNodes().at(0).simulate("click");

    expect(mockFn).toHaveBeenCalled();
  });
  test("check add api call", () => {
    const fetchFn = jest.fn(async () => {
      await supabase.from("ReactTodo").insert([
        {
          name: "updatedName",
          created_at: new Date(Date.now()),
        },
      ]);
    });

    output.find(".btn__create").hostNodes().simulate("click");
    output.find(".textarea__edit-name").hostNodes().simulate("change", "abcd");
    output.find(".btn__save-button").hostNodes().simulate("click");
    expect(mockFn).toBeCalledTimes(2);
  });
});

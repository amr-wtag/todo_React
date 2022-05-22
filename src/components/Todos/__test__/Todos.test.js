/* eslint-disable testing-library/no-debugging-utils */
import { mount, shallow } from "enzyme";
import Todos from "../index";
import { AppContext } from "../../../App";

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
          toasts: [],
          search: "",
          setToasts: mockFn,
          dataCount: 13,
          setDataCount: mockFn,
          setShowEmpty: mockFn,
          showBigSpinner: false,
          removeCompleteFromIncomplete: mockFn,
          handleRemoveTodo: mockFn,
        }}
      >
        <Todos />
      </AppContext.Provider>,
    );
  });

  test("function are called after click", () => {
    expect(output.find("loadmoreOver").length).toBe(0);
  });
  test("check button have been clicked", () => {
    console.log(
      output
        .find(".topButton")
        .hostNodes()
        .at(0)
        .debug() /* children().at(2).props().body */,
    );
    output.find(".topButton").hostNodes().at(0).simulate("click");

    expect(mockFn).toHaveBeenCalled();
  });
  test("loadmore button hides and show less appear after all value shown", () => {
    output.find(".loadMoreBtnContainer").hostNodes().simulate("click");
    console.log(output.find(".loadMoreBtnContainer").children().debug());
    expect(output.find(".loadMoreBtnContainer").children()).toBe("Show Less");
  });
});

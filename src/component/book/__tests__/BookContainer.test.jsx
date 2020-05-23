import React from "react";
import renderWithRedux from "../../../util/testUtil";
import BookContainer from "../BookContainer";
import BookList from "../BookList";

jest.mock("../BookList");
describe("BookContainer", () => {
  beforeAll(() => {
    BookList.mockImplementation(() => <div>mock booklist comp</div>);
  });

  it("should render with wihtout error", () => {
    const books = [
      {
        id: 1,
        title: "test title",
        description: "desc",
        releaseYear: 2019,
      },
    ];
    renderWithRedux(<BookContainer />, {
      initialState: {
        bookReducer: {
          books,
        },
      },
    });
    expect(BookList).toHaveBeenCalledWith({ books }, {});
  });
});

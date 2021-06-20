import React from "react";
import { render } from "@testing-library/react";
import BookListItem from "../BookListItem";

describe("BookListItem", () => {
  it("should render booklistitem with error", () => {
    const book = {
      id: "1",
      title: "test title",
      description: "desc",
      releaseYear: 2019,
    };
    const { getByText, getAllByText } = render(<BookListItem book={book} />);
    expect(getAllByText("test title")[0]).toBeInTheDocument();
    expect(getByText("desc")).toBeInTheDocument();
    expect(getByText("2019")).toBeInTheDocument();
  });
});

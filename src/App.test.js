import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("should render app without error", () => {
    render(<App />);
  });
});

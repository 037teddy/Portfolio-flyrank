import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ToolResultCard from "./ToolResultCard";

describe("ToolResultCard", () => {
  const result = {
    location: "London, United Kingdom",
    temperature: 22,
    condition: "Mainly clear",
    windSpeed: 10.8,
  };

  it("renders the weather result inside an accessible group", () => {
    render(<ToolResultCard result={result} />);
    expect(
      screen.getByRole("group", { name: /weather result for london/i })
    ).toBeInTheDocument();
  });

  it("displays the temperature, condition, and wind speed", () => {
    render(<ToolResultCard result={result} />);
    expect(screen.getByText("22°")).toBeInTheDocument();
    expect(screen.getByText("Mainly clear")).toBeInTheDocument();
    expect(screen.getByText(/10.8 km\/h/i)).toBeInTheDocument();
  });
});
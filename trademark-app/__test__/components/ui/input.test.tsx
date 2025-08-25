import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Componente Input", () => {
  it("renders with default props", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("Acepta y muestra un marcador de posición.", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });
});

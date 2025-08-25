
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";

describe("Componente Card", () => {
  it("Renderiza Card con children", () => {
    render(
      <Card>
        <span>Content</span>
      </Card>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("Renderiza CardHeader, CardTitle, CardDescription y CardAction", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });
});

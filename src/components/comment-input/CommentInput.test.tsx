import { render, fireEvent, screen } from "@testing-library/react";
import CommentInput from "./CommentInput";

describe("CommentInput Spec", () => {
  test("renders without crashing", async () => {
    render(<CommentInput addComment={jest.fn()} />);

    const textarea = await screen.findByPlaceholderText("Add a comment...");

    expect(textarea).toBeInTheDocument();
  });

  test("button is disabled when text area is empty", async () => {
    render(<CommentInput addComment={jest.fn()} />);

    const button = await screen.findByText("Add comment");

    expect(button).toBeDisabled();
  });

  test("button is enabled when text area is full", async () => {
    const events = { addComment: jest.fn() };
    const spy = jest.spyOn(events, "addComment");

    render(<CommentInput addComment={events.addComment} />);

    const input = await screen.findByPlaceholderText("Add a comment...");
    const button = await screen.findByText("Add comment");

    fireEvent.change(input, { target: { value: "Hello" } });

    expect(button).toBeEnabled();
    expect(spy).not.toHaveBeenCalled();
  });

  test("add event is called after clicking add comment button", async () => {
    const events = { addComment: jest.fn() };
    const spy = jest.spyOn(events, "addComment");

    render(<CommentInput addComment={events.addComment} />);

    const textarea = await screen.findByPlaceholderText("Add a comment...");
    const button = await screen.findByText("Add comment");

    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(spy).toHaveBeenCalledWith("Hello");
  });

  test("that text area value is reset after clicking add comment", async () => {
    const events = { addComment: jest.fn() };
    const spy = jest.spyOn(events, "addComment");

    render(<CommentInput addComment={events.addComment} />);

    const textarea = (await screen.findByPlaceholderText(
      "Add a comment..."
    )) as HTMLTextAreaElement;
    const button = await screen.findByText("Add comment");

    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(spy).toHaveBeenCalledWith("Hello");
    expect(textarea.value).toBe("");
  });
});

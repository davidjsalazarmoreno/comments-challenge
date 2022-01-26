import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import * as services from "./services/comment-service";

describe("App Spec", () => {
  test("renders without crashing", async () => {
    const spy = jest.spyOn(services, "getComments");

    spy.mockImplementationOnce(() => Promise.resolve([]));

    render(<App />);

    const app = await screen.findByText("Loading...");

    expect(app).toBeInTheDocument();
  });

  test("should render the error when service rejects", async () => {
    const spy = jest.spyOn(services, "getComments");

    spy.mockImplementationOnce(() => Promise.reject("My error"));

    render(<App />);

    const comment = await screen.findByText(
      "There was an error loading your comments, please reload the page."
    );

    expect(comment).toBeInTheDocument();
  });

  test("should render the comments when service resolves", async () => {
    const comments = [
      {
        text: "Hello World",
        date: "2020-01-01",
        score: 5,
      },
    ];
    const spy = jest.spyOn(services, "getComments");

    spy.mockImplementationOnce(() => Promise.resolve(comments));

    render(<App />);

    const comment = await screen.findByText("Hello World");

    expect(comment).toBeInTheDocument();
  });

  test("should filter comments on keyup", async () => {
    const comments = [
      {
        text: "Hello World",
        date: "2020-01-01",
        score: 100,
      },
      {
        text: "Foo",
        date: "2022-01-01",
        score: 100,
      },
      {
        text: "Bar",
        date: "2010-01-01",
        score: 100,
      },
    ];
    const spy = jest.spyOn(services, "getComments");

    spy.mockImplementationOnce(() => Promise.resolve(comments));

    render(<App />);

    const input = await screen.findByPlaceholderText(
      "Live filtering comments..."
    );

    userEvent.type(input, "Bar");

    const comment = await screen.findByText("Bar");

    expect(input).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
  });

  test("should increase/decrease the comment on click", async () => {
    const comments = [
      {
        text: "Bar",
        date: "2010-01-01",
        score: 150,
      },
    ];
    const spy = jest.spyOn(services, "getComments");

    spy.mockImplementationOnce(() => Promise.resolve(comments));

    render(<App />);

    const scores = await screen.findByText("Score: 150");
    const increase = await screen.findByLabelText("increase");
    const decrease = screen.getByLabelText("decrease");

    fireEvent.click(increase);

    expect(scores.textContent).toBe("Score: 151+-");

    fireEvent.click(decrease);

    expect(scores.textContent).toBe("Score: 150+-");
  });

  test("should add a new comment", async () => {
    const spy = jest.spyOn(services, "getComments");

    spy.mockImplementationOnce(() => Promise.resolve([]));

    render(<App />);

    const textarea = (await screen.findByPlaceholderText(
      "Add a comment..."
    )) as HTMLTextAreaElement;
    const button = await screen.findByText("Add comment");

    await fireEvent.change(textarea, { target: { value: "Hello" } });
    await fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(textarea.value).toBe("");
    expect(await screen.findByText("Hello")).toBeInTheDocument();
  });
});

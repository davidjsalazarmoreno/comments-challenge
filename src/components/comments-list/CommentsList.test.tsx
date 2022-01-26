import { fireEvent, render, screen } from "@testing-library/react";
import CommentsList from "./CommentsList";

describe("CommentsList Spec", () => {
  test("renders without crashing", async () => {
    const comments = [
      {
        text: "Hello World",
        date: "2020-01-01",
        score: 5,
      },
    ];
    render(<CommentsList items={comments} updateScore={jest.fn()} />);

    const comment = await screen.findByText("Hello World");

    expect(comment).toBeInTheDocument();
  });

  test("comments should be ordered from older first to newer later", async () => {
    const comments = [
      {
        text: "Hello World!",
        date: "2022-01-04T18:49:21.392Z",
        score: 5,
      },
      {
        text: "Hello Bar!",
        date: "2021-06-04T18:49:21.392Z",
        score: -10,
      },
      {
        text: "Hello Foo!",
        date: "2015-01-10T18:49:21.392Z",
        score: 10,
      },
    ];
    render(<CommentsList items={comments} updateScore={jest.fn()} />);

    const list = screen.getAllByText(/Hello/i);

    expect(list.length).toBe(3);
    expect(list[0].textContent).toBe("Hello Foo!");
    expect(list[1].textContent).toBe("Hello Bar!");
    expect(list[2].textContent).toBe("Hello World!");
  });

  test("comment score should be updated after click", async () => {
    const comments = [
      {
        text: "Hello World!",
        date: "2022-01-04T18:49:21.392Z",
        score: 5,
      },
    ];
    const props = {
      updateScore: jest.fn(),
    };
    const spy = jest.spyOn(props, "updateScore");
    render(<CommentsList items={comments} {...props} />);

    const scores = screen.getByText("Score: 5");
    const increase = screen.getByLabelText("increase");
    const decrease = screen.getByLabelText("decrease");

    fireEvent.click(increase);

    expect(spy).toHaveBeenCalledWith(1, 0);
    fireEvent.click(decrease);

    expect(scores.textContent).toBe("Score: 5+-");

    expect(spy).toHaveBeenCalledWith(-1, 0);

    expect(spy).toHaveBeenCalledTimes(2);
  });
});

import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentFilter from "./CommentFilter";

describe("CommentFilter Spec", () => {
  test("renders without crashing", async () => {
    render(<CommentFilter filterComments={jest.fn()} />);

    const textarea = await screen.findByPlaceholderText(
      "Live filtering comments..."
    );

    expect(textarea).toBeInTheDocument();
  });

  test("the criteria search on change", async () => {
    const props = {
      filterComments: jest.fn(),
    };
    const spy = jest.spyOn(props, "filterComments");
    render(<CommentFilter {...props} />);

    const textarea = (await screen.findByPlaceholderText(
      "Live filtering comments..."
    )) as HTMLTextAreaElement;
    const button = await screen.findByText("Filter");

    fireEvent.change(textarea, { target: { value: "test" } });
    fireEvent.click(button);

    expect(textarea.value).toBe("test");
    expect(spy).toHaveBeenCalledWith("test");
  });

  test("the criteria search on keyup", async () => {
    const props = {
      filterComments: jest.fn(),
    };
    const spy = jest.spyOn(props, "filterComments");
    render(<CommentFilter {...props} />);

    const textarea = (await screen.findByPlaceholderText(
      "Live filtering comments..."
    )) as HTMLTextAreaElement;
    const button = await screen.findByText("Filter");

    userEvent.type(textarea, "est");
    fireEvent.click(button);

    expect(textarea.value).toBe("est");
    expect(spy).toHaveBeenCalledWith("est");
  });
});

import React, { useState } from "react";
import "./CommentInput.css";

export type Props = {
  addComment: (text: string) => void;
};

function CommentInput(props: Props) {
  const { addComment } = props;
  const [comment, setComment] = useState("");
  const isValidComment = comment.length > 0;

  return (
    <div className="comment-input">
      <textarea
        placeholder="Add a comment..."
        onChange={(event) => {
          if (event.target instanceof HTMLTextAreaElement) {
            setComment(event.target.value);
          }
        }}
        value={comment}
      />
      <button
        disabled={!isValidComment}
        onClick={() => {
          setComment("");
          addComment(comment);
        }}
      >
        Add comment
      </button>
    </div>
  );
}

export default CommentInput;

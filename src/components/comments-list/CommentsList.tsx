import React from "react";
import { sortByDate } from "../../utils";
import Comment, { Props as CommentType } from "../comment/Comment";
import "./CommentsList.css";

export type Props = {
  items: CommentType[];
  updateScore: (score: number, index: number) => void;
};

function CommentsList(props: Props) {
  const { items, updateScore } = props;

  return (
    <div className="comments-list">
      {items.sort(sortByDate).map((item, index) => (
        <Comment
          updateScore={(score) => updateScore(score, index)}
          key={index}
          {...item}
        />
      ))}
    </div>
  );
}

export default CommentsList;

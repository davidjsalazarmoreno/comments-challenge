import React from "react";
import "./Comment.css";

export type Props = {
  text: string;
  date: string;
  score: number;
  visible?: boolean;
};

export type AdditionalProps = {
  updateScore: (score: number) => void;
};

function Comment(props: Props & AdditionalProps) {
  const { date, text, visible = true, score, updateScore } = props;

  const handleScoreClick = (result: string) => {
    const score = result === "like" ? 1 : -1;
    updateScore(score);
  };

  return (
    <div className={`comment ${!visible ? "hidden" : ""}`}>
      <div className="comment-header">
        <div className="comment-date">{date}</div>
        <div className="comment-score">
          Score: {score}
          <button onClick={() => handleScoreClick("like")} aria-label="increase">+</button>
          <button onClick={() => handleScoreClick("dislike")} aria-label="decrease">-</button>
        </div>
      </div>
    
      <div className="comment-text">{text}</div>
    </div>
  );
}

export default Comment;

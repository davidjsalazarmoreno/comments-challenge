import React, { useEffect, useState } from "react";
import "./App.css";
import CommentInput from "./components/comment-input/CommentInput";
import CommentList from "./components/comments-list/CommentsList";
import { Props as CommentType } from "./components/comment/Comment";
import { getComments } from "./services/comment-service";
import CommentFilter from "./components/comment-filter/CommentFilter";

export type RequestStatus = "loading" | "error" | "success" | "idle";

function App() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [status, setStatus] = useState<RequestStatus>("idle");

  useEffect(() => {
    getComments()
      .then((commentsResponse) => {
        setStatus("success");
        setComments(commentsResponse);
      })
      .catch(() => {
        setStatus("error");
        setComments([]);
      });
  }, []);

  if (status === "error") {
    return (
      <div>
        There was an error loading your comments, please reload the page.
      </div>
    );
  }

  if (status === "loading" || status === "idle") {
    return <div>Loading...</div>;
  }

  const handleFilterComments = (criteria: string) => {
    setComments(
      comments.map((comment) => {
        return {
          ...comment,
          visible: comment.text.toLowerCase().includes(criteria.toLowerCase()),
        };
      })
    );
  };

  const handleUpdateScore = (score: number, position: number) => {
    setComments(
      comments.map((comment, index) => {
        return {
          ...comment,
          score: position === index ? score + comment.score : comment.score,
        };
      })
    );
  };

  return (
    <div className="App">
      <div className="App__container">
        <div className="App__filter-placeholder">
          <CommentFilter filterComments={handleFilterComments} />
        </div>
        <div className="App__comment-list-placeholder">
          <CommentList items={comments} updateScore={handleUpdateScore} />
        </div>
        <div className="App__comment-input-placeholder">
          <CommentInput
            addComment={(text) => {
              setComments([
                ...comments,
                { text, date: new Date().toISOString(), score: 0 },
              ]);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

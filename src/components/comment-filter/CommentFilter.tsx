import React, { useState } from "react";
import "./CommentFilter.css";

export type Props = {
  filterComments: (criteria: string) => void;
};

function CommentFilter(props: Props) {
  const { filterComments } = props;
  const [criteria, setCriteria] = useState("");

  return (
    <div className="comment-filter">
      <input
        onChange={(event) => {
          if (event.target instanceof HTMLInputElement) {
            setCriteria(event.target.value);
          }
        }}
        onKeyUp={(event) => {
          if (event.target instanceof HTMLInputElement) {
            filterComments(criteria);
          }
        }}
        value={criteria}
        placeholder="Live filtering comments..."
      />

      <button
        onClick={() => {
          filterComments(criteria);
        }}
      >
        Filter
      </button>
    </div>
  );
}

export default CommentFilter;

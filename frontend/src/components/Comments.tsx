import { useState } from "react";
import "../css/Comments.css";

const calcOffset = (limit: number, page: number) => {
  return (page - 1) * limit;
};

const getComments = async (limit: number, offset: number) => {
  const commentsURL = new URL("http://localhost:3500/comment");
  const commentsQuery = new URLSearchParams({
    limit: `${limit}`,
    offset: `${offset}`,
  }).toString();
  commentsURL.search = commentsQuery;
  try {
    const response = await fetch(commentsURL, {
      method: "GET",
    });

    if (!response.ok) throw new Error("Cannot get the comments from db");

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

interface Props {
  limit: number;
}

const Comments = ({ limit }: Props) => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(calcOffset(page, limit));

  return (
    <div className="Comments-Container">
      <p className="Comments">test</p>
      <input
        className="Comment-Input"
        type="text"
        placeholder="Write your comment here"
      />
      <button>Submit</button>
      <button
        onClick={() => {
          setPage((page) => page + 1);
          setOffset(calcOffset(page, limit));
          const comments = getComments(limit, offset);
          console.log(comments);
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default Comments;

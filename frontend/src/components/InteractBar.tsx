import React, { use, Suspense, useEffect, useState, useRef } from "react";
import "../css/InteractBar.css";

const likeUrl = new URL(`http://localhost:3500/likes`);

const registerUrl = new URL(`http://localhost:3500/register`);

// const register = async (data = {}) => {
//   const response = await fetch(registerUrl, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) throw new Error("Could not update the amount of likes");
//   return await response.json();
// };

const updateLikes = async (data = {}, id: string = "billy") => {
  const likeQuery = new URLSearchParams({ id: id }).toString();
  likeUrl.search = likeQuery;

  const response = await fetch(likeUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Could not update the amount of likes");
  return await response.json();
};

interface Props {
  id: string;
}

const InteractBar = ({ id }: Props) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const isMounted = useRef(false);

  console.log(`ID: ${id}`);

  useEffect(() => {
    const register = async (data = {}) => {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Could not update the amount of likes");
      return await response.json();
    };
    register({ currID: id });

    console.log("REGISTERED!");

    const fetchLikes = async (id: string = "billy") => {
      const likeQuery = new URLSearchParams({ id: id }).toString();
      likeUrl.search = likeQuery;

      const response = await fetch(likeUrl, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Could not get number of likes");
      const data = await response.json();

      setNumLikes(data.likes);
    };
    fetchLikes(id);
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      //   console.log(`id: ${id}`);
      //   const func = async () => register({ currID: id });
      //   func();
      isMounted.current = true;
      return;
    }

    console.log(numLikes);
    updateLikes({ likes: numLikes }, id);
  }, [numLikes]);

  return (
    <div className="Bar">
      <button className="Comment">Comment</button>
      <button
        className="Like"
        onClick={() => {
          setHasLiked(!hasLiked);
          setNumLikes((prevcount) =>
            !hasLiked ? prevcount + 1 : prevcount - 1,
          );
        }}
      >
        {hasLiked ? "❤️" : "🤍"}
      </button>
      <p>{numLikes}</p>
    </div>
  );
};

export default InteractBar;

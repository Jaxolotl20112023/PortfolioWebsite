import React, { use, Suspense, useEffect, useState, useRef } from "react";
import "../css/InteractBar.css";

const likeUrl = new URL(`http://localhost:3500/likes`);
const registerUrl = new URL(`http://localhost:3500/register`);

const register = async (data = {}) => {
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Could not update the amount of likes");
  } catch (err) {
    console.error("Request error! ", err);
  }
};

const updateLikes = async (data = {}) => {
  try {
    const response = await fetch("http://localhost:3500/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Could not update the amount of likes");
    console.log("successfully updated the likes");

    return await response.json();
  } catch (err) {
    console.error("Request error! ", err);
  }
};

interface Props {
  id: string;
}

const InteractBar = ({ id }: Props) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    register({ currID: id });

    const fetchLikes = async (id: string = "billy") => {
      const getLikeUrl = likeUrl;
      const likeQuery = new URLSearchParams({ id: id }).toString();

      getLikeUrl.search = likeQuery;

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
      isMounted.current = true;
      return;
    }

    updateLikes({ likes: numLikes, id: id });
  }, [numLikes]);

  return (
    <div className="Bar">
      <button className="Comment">💬</button>

      <div className="Likes">
        <button
          className="Like-Button"
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
    </div>
  );
};

export default InteractBar;

import { useState } from "react";
import "../css/Comments.css";

const getCurrentDate = () => {
  const date = new Date(); 
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const calcOffset = (limit: number, page: number) => {
  console.log("calc offset page: ", page);
  console.log("calc offset limit: ", limit);
  return (page - 1) * limit;
};

const addComment = async (data={}) => {

  console.log("add comment");

  const commentsURL = new URL("http://localhost:3500/comment"); 
  try {
    const response = await fetch(commentsURL, {
      method: "POST", 
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error("Could not post comment"); 

  } catch(err) {
    console.error(err); 
  }
  
}

const getComments = async (
  limit: number,
  offset: number,
  setCommentContent: React.Dispatch<React.SetStateAction<string[]>>,
  commentContent: string[]
) => {
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

    const comments = await response.json();

    if (comments.details.length <= 0) return false;
    

    // console.log(comments.details.map((comment: any) => comment.content));
    setCommentContent([...comments.details.map((comment: any) => comment.content)]);
    return true; 
  } catch (err) {
    console.error(err);
  }
};

interface Props {
  limit: number;
}

const Comments = ({ limit }: Props) => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [commentContent, setCommentContent] = useState([""]);
  const [inputValue, setInputValue] = useState(""); 
  const [loadMore, setLoadMore] = useState(true); 

  return (
    <div className="Comments-Container">
      {commentContent.map((comment: any) => (
        <p className="Comments">{comment}</p>
      ))}

      <input
        className="Comment-Input"
        type="text"
        placeholder="Write your comment here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={async (e) => {
        e.preventDefault(); 
        console.log(inputValue);
        await addComment({date : getCurrentDate(), content : inputValue})
        await getComments(limit,offset, setCommentContent, commentContent); 
      }} className="Submit">Submit</button>

      {loadMore && (
        <button
          onClick={async () => {
            setPage(page+1);
            console.log(page);                    
            setOffset(calcOffset(limit, page));
            console.log("offset: ",offset);
            getComments(limit, offset, setCommentContent,commentContent, setLoadMore);
          }}>
          Load More
        </button>
      )}
      
    </div>
  );
};

export default Comments;

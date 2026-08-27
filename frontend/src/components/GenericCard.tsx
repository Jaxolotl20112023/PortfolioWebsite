import React from "react";
import Card from "react-bootstrap/Card";
import "../css/GenericCard.css";

interface Props {
  title: string; 
  caption?: string; 
  src: string; 
  root?: string;
}

const GenericCard = ({title, caption, src, root} : Props) => {
  return (
    <div>
      <Card className="Card">
        <Card.Img className="CardImage" variant="top" src={`${root}/${src}`} />
        <Card.Body>
          <Card.Title className="CardTitle">{title}</Card.Title>
          <Card.Text className="CardText">{caption}</Card.Text>
        </Card.Body>
      </Card>      
    </div>
  );
};

export default GenericCard;

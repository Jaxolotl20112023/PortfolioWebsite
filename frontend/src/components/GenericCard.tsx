import React from "react";
import Card from "react-bootstrap/Card";
import "../css/GenericCard.css";

const GenericCard = () => {
  return (
    <div>
      <Card className="Card">
        <Card.Img variant="top" src="HCA/HCA1.jpg" />
        <Card.Body>
          <Card.Title>Generic Title</Card.Title>
          <Card.Text>Some random ahh text</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GenericCard;

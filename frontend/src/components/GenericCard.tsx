import React from "react";
import Card from "react-bootstrap/Card";
// import "../css/GenericCard.css";

interface Props {
  title: string;
  children?: React.ReactNode;
  img_url: string;
}

const GenericCard = ({ title, children, img_url }: Props) => {
  return (
    <div className="Card">
      <img className="Img" src={img_url} alt="" />
      <h3 className="Title">{title}</h3>
      <p className="Description">{children}</p>
      {/* <Card className="Card">
        <Card.Img variant="top" src={img_url} />
        <Card.Body className="CardBody">
          <Card.Title className="text-white">{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card> */}
    </div>
  );
};

export default GenericCard;

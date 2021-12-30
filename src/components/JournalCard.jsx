import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const JournalCard = (props) => {
  const [showButton, setShowButton] = useState("translateY(200%)");

  return (
    <Card
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseOver={() => setShowButton("translateY(0%)")}
      onMouseOut={() => setShowButton("translateY(200%)")}
    >
      <Card.Header
        className="bg-white"
        style={{ fontWeight: "500", fontSize: "20px", color: "black" }}
      >
        {props.title}
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ fontWeight: "400", fontSize: "18px" }}>
          {props.subTitle}
        </Card.Title>
        <Card.Text style={{ fontWeight: "300" }}>
          {props.content.slice(0, 250)}
          {props.content.length > 250 ? (
            <Link
              to={"/journal/" + props._id}
              style={{ textDecoration: "none" }}
              variant="primary"
            >
              ...Read More
            </Link>
          ) : (
            ""
          )}
        </Card.Text>
        <Button
          className="deleteButton"
          style={{ postion: "absolute", transform: showButton }}
          variant="danger"
          onClick={(e) => props.onDelete(e, props._id)}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default JournalCard;

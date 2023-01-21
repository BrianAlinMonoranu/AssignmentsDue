import React from "react";
import Card from "react-bootstrap/Card";

const card = ({ module, assignment }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title> {module} </Card.Title>{" "}
        <Card.Subtitle className="mb-2 text-muted">
          UCD COMPUTER SCIENCE{" "}
        </Card.Subtitle>{" "}
        <Card.Text> {assignment} </Card.Text>{" "}
      </Card.Body>{" "}
    </Card>
  );
};

export default card;

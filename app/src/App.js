import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import io from "socket.io-client";
import feathers from "@feathersjs/client";
import { Row, Col } from "react-bootstrap";
import Card from "./card";

const App = () => {
  const [moduleName, setModuleName] = useState("");
  const [assignment, setAssignment] = useState("");
  const [ideas, setIdeas] = useState([{}]);

  const socket = io("http://localhost:3030");

  const app = feathers();

  // Register socket.io to talk to server
  app.configure(feathers.socketio(socket));

  const setModule = (e) => {
    setModuleName(e.target.value);
  };

  const setCurrentAssignment = (e) => {
    setAssignment(e.target.value);
  };

  function createBox(e) {
    e.preventDefault();
    // Create new idea
    app.service("ideas").create({
      module: moduleName,
      assignment: assignment,
    });

    // Clear inputs
    setModuleName("");
    setAssignment("");
  }

  useEffect(() => {
    init();
  });

  function init() {
    // Find ideas
    setIdeas(app.service("ideas").find());
    // // Add idea in realtime
    // app.service("ideas").on("created", renderIdea);
  }

  function renderIdea(idea) {}

  return (
    <>
      <div className="container mb-4 mt-3">
        <h1 className="text-center">Computer Science UCD</h1>
      </div>

      <div className="container">
        <Form>
          <Form.Group className="mb-3 mr-5 ml-5" controlId="formBasicEmail">
            <Form.Label>Module:</Form.Label>
            <Form.Control
              onChange={setModule}
              type="text"
              placeholder="Enter Module"
            />
            <Form.Text className="text-muted">{moduleName}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Assignment:</Form.Label>
            <Form.Control
              onChange={setCurrentAssignment}
              type="text"
              placeholder="Enter Module"
            />
            <Form.Text className="text-muted">{assignment}</Form.Text>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button onClick={createBox} variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
        {/* <Row className="justify-content-center align-items-center">
          <Col>
            <div id="ideas">
              {ideas.map((card) => (
                <div>{"James"}</div>
              ))}
            </div>
          </Col>
        </Row> */}
      </div>
    </>
  );
};

export default App;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, fetchWeather } from "../store/todoSlice";
import { Form, Button, Row, Col } from "react-bootstrap";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTask = task.trim();

    if (trimmedTask) {
      const newTodo = {
        id: Date.now(),
        text: trimmedTask,
        priority,
        location: location.trim() || null,
        completed: false,
      };

      dispatch(addTodo(newTodo));

      if (location.trim()) {
        dispatch(fetchWeather(location.trim()));
      }

      setTask("");
      setLocation("");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-3">
        <Col sm={12} md={5}>
          <Form.Control
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter new task"
            required
            className="p-2 fs-5"
            style={{ height: "50px" }}
          />
        </Col>
        <Col sm={12} md={3}>
          <Form.Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 fs-5"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Select>
        </Col>
        <Col sm={12} md={3}>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="p-2 fs-5"
          />
        </Col>
        <Col sm={12} md={2} lg={1}>
          <Button type="submit" variant="primary" className="w-100 p-2 fs-5">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskInput;

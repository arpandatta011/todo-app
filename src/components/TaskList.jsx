import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "../store/todoSlice";
import { ListGroup, Button, Badge, Alert } from "react-bootstrap";

const TaskList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const weatherData = useSelector((state) => state.todos.weatherData);
  const dispatch = useDispatch();

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <>
      {todos.length === 0 ? (
        <Alert variant="info" className="text-center">
          No tasks available
        </Alert>
      ) : (
        <ListGroup>
          {todos.map((todo) => {
            const cityWeather = todo.location
              ? weatherData[todo.location]
              : null;

            return (
              <ListGroup.Item
                key={todo.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <span>{todo.text}</span>
                  <Badge
                    bg={getPriorityVariant(todo.priority)}
                    className="ms-2"
                  >
                    {todo.priority}
                  </Badge>
                  {cityWeather && (
                    <Badge bg="info" className="ms-2">
                      {cityWeather.temperature}°C - {cityWeather.description}
                    </Badge>
                  )}
                </div>
                <div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="ms-2 px-2 fs-5"
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  );
};

export default TaskList;

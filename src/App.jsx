import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Spinner } from "react-bootstrap";
import { initializeAuth, logout } from "./store/authSlice";
import Login from "./components/Login";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(initializeAuth());
    setTimeout(() => setLoading(false), 1000);
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h1 className="text-center text-md-start">Todo List</h1>
        <div className="d-flex flex-column flex-sm-row align-items-center mt-1 mt-md-0">
          <span className="me-sm-3 mb-2 mb-sm-0 p-2 fs-5 text-center">
            Welcome, {user?.username}!
          </span>
          <Button
            variant="outline-danger"
            onClick={handleLogout}
            className="p-2 fs-6"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Task Input & Task List */}
      <TaskInput />
      <TaskList />
    </Container>
  );
}

export default App;

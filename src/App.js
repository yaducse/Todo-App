import "./App.css";
import { useEffect, useState } from "react";
import { Button, TextField, Container, Typography, Link } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase/app";
import { AddCircleOutlineRounded } from "@material-ui/icons";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://todo-app-930ea.web.app/">
        Todo App by Yadu 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text }))
        );
      });
  }, []);

  const addTodo = (e) => {
    //what to happen when button is clicked
    e.preventDefault(); //to stop the page refresh
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); //clear the
  };
  return (
    <>
    <Container maxWidth="sm">
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="Enter ToDo"
          name="todo"
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addTodo}
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todoObj={todo} />
        ))}
      </ul>
    </Container>
    <Copyright />
    </>
  );
}

export default App;

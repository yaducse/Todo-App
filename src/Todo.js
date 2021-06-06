import { DeleteOutlineRounded, Edit } from "@material-ui/icons";
import {
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import React, { useState } from "react";
import db from "./firebase";
import "./Todo.css";

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");

  const openUpdateDialog = (todo) => {
    setOpen(true);
    setToUpdateId(todo.id);
    setUpdate(todo.name);
  };

  const editTodo = (e) => {
    e.preventDefault();
    db.collection("todos").doc(toUpdateId).update({
      text: update,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTodo = (id) => {
    db.collection("todos").doc(id).delete();
  };

  return (
    <List dense={true}>
      <ListItem>
        <ListItemText
          primary={props.todoObj.text}
          secondary={props.todoObj.timestamp}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="Edit"
            onClick={() => openUpdateDialog(props.todoObj)}
          >
            <Edit />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteTodo(props.todoObj.id)}
          >
            <DeleteOutlineRounded />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <form noValidate>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              label="Update Todo"
              type="text"
              fullWidth
              name="updateTodo"
              placeholder={props.todoObj.text}
              autoComplete="off"
              value={update}
              onChange={(event) => setUpdate(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={!update} type="submit" onClick={editTodo} color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </List>
  );
}

export default Todo;

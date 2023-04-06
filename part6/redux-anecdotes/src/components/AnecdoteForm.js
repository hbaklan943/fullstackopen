import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  resetNotification,
} from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const newAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.anecdote.value));
    dispatch(setNotification(`${event.target.anecdote.value}, added`));
    event.target.anecdote.value = "";
    setTimeout(() => {
      dispatch(resetNotification());
    }, 3000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries("anecdotes");
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `new anecdote "${newAnecdote.content}" created`,
      });
      setTimeout(() => {
        notificationDispatch({
          type: "RESET_NOTIFICATION",
        });
      }, 3000);
    },
    onError: () => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `too short anecdote, must have length 5 or more`,
      });
      setTimeout(() => {
        notificationDispatch({
          type: "RESET_NOTIFICATION",
        });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate(content);
    event.target.anecdote.value = "";
    console.log("new anecdote");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

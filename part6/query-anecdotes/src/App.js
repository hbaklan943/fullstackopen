import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAnecdotes, voteAnecdote } from "./requests";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const anecdoteVotesMutation = useMutation(voteAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries("anecdotes");
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `anecdote "${newAnecdote.content}" voted`,
      });
      setTimeout(() => {
        notificationDispatch({
          type: "RESET_NOTIFICATION",
        });
      }, 5000);
    },
  });

  const result = useQuery("anecdotes", getAnecdotes, { retry: 1 });

  if (result.isLoading) {
    return <div>data loading...</div>;
  }
  if (result.isError) {
    return <div>an error occured while fetching the data</div>;
  }
  const handleVote = (anecdote) => {
    console.log("vote");
    anecdoteVotesMutation.mutate(anecdote);
  };

  const anecdotes = result.data || [];

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

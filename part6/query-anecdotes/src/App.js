import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "react-query";
import { getAnecdotes } from "./requests";

const App = () => {
  const result = useQuery("anecdotes", getAnecdotes, { retry: 1 });
  console.log(result);

  if (result.isLoading) {
    return <div>data loading...</div>;
  }
  if (result.isError) {
    return <div>an error occured while fetching the data</div>;
  }
  const handleVote = (anecdote) => {
    console.log("vote");
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

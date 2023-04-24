import { useSelector, useDispatch } from "react-redux";
import { increaseVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filters, anecdotes }) => {
    console.log(anecdotes);
    return anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(filters.toLowerCase());
    });
  });

  anecdotes.sort((first, second) => {
    return second.votes - first.votes;
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(increaseVotes(anecdote));
    dispatch(setNotification(`You voted for ${anecdote.content}`, 3));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

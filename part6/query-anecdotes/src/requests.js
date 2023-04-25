import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const createAnecdote = (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  };
  return axios.post(baseUrl, newAnecdote).then((res) => res.data);
};

export const voteAnecdote = (anecdote) => {
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  return axios
    .put(`${baseUrl}/${anecdote.id}`, newAnecdote)
    .then((res) => res.data);
};

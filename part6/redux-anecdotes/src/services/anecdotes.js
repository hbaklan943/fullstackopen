import axios from "axios";
import anecdoteReducer from "../reducers/anecdoteReducer";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addNew = async (content) => {
  const object = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (anecdote) => {
  const object = {
    content: anecdote.content,
    votes: anecdote.votes,
  };
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, object);
  return response.data;
};

export default { getAll, addNew, update };

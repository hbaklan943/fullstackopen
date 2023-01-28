import { useState } from "react";

const App = () => {
  const anectodes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voteCounts, setVoteCounts] = useState(new Uint8Array(8))

  const findMostVoted = () => {
    let highestVoteCount = voteCounts[0];
    let mostVotedAnectod = 0;
    for (let i = 0; i < voteCounts.length; i++) {
      if (voteCounts[i] > highestVoteCount) {
        highestVoteCount = voteCounts[i];
        mostVotedAnectod = i;

      }
    }
    return mostVotedAnectod;

  }
  const voteHandler = (selected) => {
    const copyOfVoteCounts = [...voteCounts]
    copyOfVoteCounts[selected] = (voteCounts[selected] + 1);
    setVoteCounts(copyOfVoteCounts);
  }
  const anectodeHandler = () => {
    const newAnectode = Math.floor(Math.random() * 8)
    if (newAnectode === anectodes) anectodeHandler();
    setSelected(newAnectode)
  }


  return (
    <>
      <p>{anectodes[selected]}</p>
      <p>{voteCounts[selected]}</p>
      <button onClick={() => voteHandler(selected)}>Vote</button>
      <button onClick={anectodeHandler}>Next Anectode</button>
      <p>Most voted anectode</p>
      <p>{anectodes[findMostVoted()]}</p>

    </>
  )
}

export default App;




import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleClick = () => {
    const value = Math.floor(Math.random() * anecdotes.length);
    setSelected(value);
  };

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] = copy[selected] + 1;
    setVotes(copy);
  };

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <Display anecdotes={anecdotes} votes={votes} />
    </>
  );
};

const Display = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVotes);
  return (
    <>
      <div>Anecdote with most votes</div>
      <div>{anecdotes[maxIndex]}</div>
      <div>has{maxVotes}votes</div>
    </>
  );
};

export default App;

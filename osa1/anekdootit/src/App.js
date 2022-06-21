import { useState } from 'react'

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ] 
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))  
  const [indexOfMax, setIndexOfMax] = useState(0)

  const giveVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    const max = Math.max(...copyVotes)
    const indexOfMax = copyVotes.indexOf(max)
    setIndexOfMax(indexOfMax)
    setVotes(copyVotes)
  }

  // Gets the most voted anecdote
  const showMostVoted = () => {
    if (Math.max(...votes) != 0) {
      return (
        <>
          {anecdotes[indexOfMax]}
        </>            
      )
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={giveVote}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * (anecdotes.length)))}>next anecdote</button>  
      <h2>Anecdote with most votes</h2>
      <p>{showMostVoted()}</p>
      <p>has {votes[indexOfMax]} votes</p>
    </div>
  )
}

export default App

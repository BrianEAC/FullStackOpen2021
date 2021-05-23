import React, { useState } from 'react'

const Button = ({ name, handleClick }) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]


  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  let copy = [...points]
  const [most, setMost] = useState();
  function randomIntFromInterval(min, max) {
    return Math.random() * (max - min) + min;
  }

  const nextClick = () => {
    let rndNum = randomIntFromInterval(0, 5)
    let rndInt = Math.round(rndNum)
    setSelected(rndInt)
  }

  const voteClick = () => {
    copy[selected] += 1
    setPoints(copy)
    if (most === undefined) {
      setMost(selected)
    }
    else if (points[selected] >= points[most]) {
      setMost(selected)
    }
  }

      if (most === undefined) {
       return (
      <div>
      <div>{anecdotes[selected]}</div>
      <div><Button name='next anecdote' handleClick={nextClick} /></div>
      <p>has {points[selected]} points</p>
      <div><Button name='vote' handleClick={voteClick} /></div>
      <h1>most voted</h1>
      <p>none</p>
      </div>
      )
    }
  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div><Button name='next anecdote' handleClick={nextClick} /></div>
      <p>has {points[selected]} points</p>
      <div><Button name='vote' handleClick={voteClick} /></div>
      <h1>most voted</h1>
      <p>{anecdotes[most]}</p>
    </div>
  )
}
export default App
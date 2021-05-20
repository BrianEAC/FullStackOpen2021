import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Statistic = ({ text, value }) => {
  return (<>
    <td>{text}</td><td>{value}</td>
  </>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  if (!all) {
    return (
      <>
        <h1>Statistics:</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <div>
      <h1>Statistics:</h1>
      <table>
        <tbody>
          <tr><Statistic text='Good' value={good} /></tr>
          <tr><Statistic text='Neutral' value={neutral} /></tr>
          <tr><Statistic text='Bad' value={bad} /></tr>
          <tr><Statistic text='All' value={all} /></tr>
          <tr><Statistic text='Average' value={(good - bad) / all} /></tr>
          <tr><Statistic text='Percentage' value={(good * 100) / all + '%'} /></tr>
        </tbody>
      </table>

    </div>
  )
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)
  return (
    <div>
      <h1>Give Feedback!</h1>
      <Button
        handleClick={goodClick}
        text='good' />

      <Button
        handleClick={neutralClick}
        text='neutral' />

      <Button
        handleClick={badClick}
        text='bad' />

      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all} />
    </div >

  )
}

export default App

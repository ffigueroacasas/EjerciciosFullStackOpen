import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = ({text, number}) => {
  return (
    <p>{text}: {number}</p>
  )
}

const Stats = ({good, bad, neutral}) => {
  const loadAverage = () => (good - bad) / (good + bad + neutral)
  const loadProportion = () => (good / (good + bad + neutral)) * 100
  if (good != 0 || bad != 0 || neutral != 0){
    return (
      <div>
        <h2>Stats: </h2>
        <StatisticLine text="Good Reviews" number={good} />
        <StatisticLine text="Bad Reviews" number={bad} />
        <StatisticLine text="Neutral Reviews" number={neutral} />
        <StatisticLine text="Total" number={good + bad + neutral}/>
        <StatisticLine text="Average" number={loadAverage()}/>
        <StatisticLine text="Positive" number={loadProportion() + '%'} />
      </div>
    )
  }
  else return (
    <h2>No feedback given</h2>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>We want your feedback!</h2>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
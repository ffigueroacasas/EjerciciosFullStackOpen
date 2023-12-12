import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Display = ({text, number}) => {
  return (
    <p>{text}: {number}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const loadAverage = () => {
    if (good + bad + neutral != 0){
      return  (good - bad) / (good + bad + neutral)
    }
    return 0
  }

  const loadProportion = () => {
    if (good + bad + neutral != 0){
      return  good / (good + bad + neutral) * 100
    }
    return 0
  }

  return (
    <div>
      <h2>We want your feedback!</h2>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <h2>Stats: </h2>
      <Display text="Good Reviews" number={good} />
      <Display text="Bad Reviews" number={bad} />
      <Display text="Neutral Reviews" number={neutral} />
      <Display text="Total" number={good + bad + neutral}/>
      <Display text="Average" number={loadAverage()}/>
      <Display text="Positive" number={loadProportion() + '%'} />
    </div>
  )
}

export default App
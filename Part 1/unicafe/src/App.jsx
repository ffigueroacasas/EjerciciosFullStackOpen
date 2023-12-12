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
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
    </div>
  )
}

export default App
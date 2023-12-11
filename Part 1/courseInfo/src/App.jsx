const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Content = (props) => {
  return (
     <div>
      <Part title={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part title={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part title={props.parts[2].name} exercises={props.parts[2].exercises}/>
     </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.title} {props.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={[part1, part2, part3]} />
      <Total exercises={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App
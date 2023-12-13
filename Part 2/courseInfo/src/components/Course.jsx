const Header = ({name}) => <h2>{name}</h2>

const Content = ({parts}) => <div>{parts.map(part => <Part key={part.id} part={part}/>)}</div>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => {
  const addUpTotal = () => parts.reduce((sum, order) =>  sum + order.exercises, 0)

  return (
    <strong><p>Total of {addUpTotal()} exercises</p></strong>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course
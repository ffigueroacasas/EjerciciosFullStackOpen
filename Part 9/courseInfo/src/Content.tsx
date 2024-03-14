interface CoursePart {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: Array<CoursePart>
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(cp => {
      return (
        <p>{cp.name} {cp.exerciseCount}</p>
      )
    })}
    </div>
  )
};

export default Content;
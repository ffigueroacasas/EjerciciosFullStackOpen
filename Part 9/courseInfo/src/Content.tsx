import Part from "./Part"
import { CoursePart } from "./types";

interface ContentProps {
  courseParts: Array<CoursePart>
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(cp => {
      return (
        <Part key={cp.name} coursePart={cp}/>
      )
    })}
    </div>
  )
};

export default Content;
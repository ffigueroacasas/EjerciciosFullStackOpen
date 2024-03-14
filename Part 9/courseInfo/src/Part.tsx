import { CoursePart } from "./types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps) => {
  const cp = props.coursePart;
  switch(cp.kind){
    case 'basic':
      return (
        <div>
          <strong>Name: {cp.name}</strong>
          <p>Exercise Count: {cp.exerciseCount}</p>
          <p>Description: {cp.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <strong>Name: {cp.name}</strong>
          <p>Exercise Count: {cp.exerciseCount}</p>
          <p>Group Project Count: {cp.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <strong>Name: {cp.name}</strong>
          <p>Exercise Count {cp.exerciseCount}</p>
          <p>Description: {cp.description}</p>
          <p>Background Material: {cp.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <strong>Name: {cp.name}</strong>
          <p>Exercise Count: {cp.exerciseCount}</p>
          <p>Description: {cp.description}</p>
          <p>Requirements: {cp.requirements.join(' - ')}</p>
        </div>
      )
  }
};

export default Part;
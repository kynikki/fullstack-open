const Header = (props) => {
  return (
    <>
      <p>{props.course}</p>    
    </>  
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.p.name} {props.p.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part p={props.p1} />
      <Part p={props.p2} />
      <Part p={props.p3} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.p1.exercises + props.p2.exercises + props.p3.exercises}</p>
    </>
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
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} />
      <Total p1={part1} p2={part2} p3={part3}/>
    </div>
  )
}

export default App



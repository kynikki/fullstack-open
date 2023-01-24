const Header = (props) => {             
    return (
      <>  
        <h2>
          {props.course.name}  
        </h2>         
      </>        
    )    
  }
  
  const Part = (props) => {     
    return (
      <>
        <li>
          {props.part.name} {props.part.exercises}
        </li> 
      </>
    )
  }
  
  const Content = (props) => {        
    return (
      <> 
        <ul>
          {props.course.parts.map(part =>
            <Part key={part.name}
              part = {part} 
            />  
          )}             
        </ul>                   
      </>
    )
  }
  
  const Total = (props) => {  
    var totalExercises = props.course.parts.reduce(function(sum, part) {
      return sum + part.exercises
    }, 0)
    return (
      <>
        <p><b>total of {totalExercises} exercises</b></p>
      </>
    )
  }

const Course = ({ course }) => {    
    return (
      <>        
        <Header course={course} />
        <Content course={course} />            
      </>
    )
}

export default Course
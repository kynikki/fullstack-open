const Header = ( {course} ) => {             
    return (
      <>  
        <h2>
          {course.name}  
        </h2>         
      </>        
    )    
  }
  
  const Part = ( {part} ) => {     
    return (
      <>
        <li>
          {part.name} {part.exercises}
        </li> 
      </>
    )
  }
  
  const Content = ( {course} ) => {        
    return (
      <> 
        <ul>
          {course.parts.map(part =>
            <Part key={part.name}
              part = {part} 
            />  
          )}             
        </ul>                   
      </>
    )
  }
  
  const Total = ( {course} ) => {  
    var totalExercises = course.parts.reduce(function(sum, part) {
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
        <Total course={course}/>            
      </>
    )
}

export default Course
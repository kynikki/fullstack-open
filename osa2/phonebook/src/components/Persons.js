import Person from './Person'

const Persons = (props) => {  
    return (
      <ul>
              {props.persons.filter(person => person.name.toUpperCase().includes(props.newFilter.toUpperCase())).map(person => (
              <Person key={person.name} name={person.name} number={person.number} /> ))}
          </ul>  
    )
}
export default Persons
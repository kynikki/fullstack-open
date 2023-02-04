import Person from './Person'

const Persons = (props) => {  
    return (
      <ul>
            {props.persons.filter(person => 
                    person.name.toUpperCase().includes(props.newFilter.toUpperCase())).map(person => (
                    <Person 
                        key={person.id} 
                        name={person.name} 
                        number={person.number} 
                        id={person.id}
                        remove={props.handleDeletePerson(person.name, person.id)} />))}
        </ul>  
    )
}
export default Persons